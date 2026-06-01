# 🔐 Mmanda's Sauces — SSL Fix Guide
## ERR_SSL_PROTOCOL_ERROR → Fixed

---

## Root Cause

Your SSL Labs scan showed:
| IP | Status |
|----|--------|
| `99.83.190.102` | ❌ Failed — no SSL response |
| `75.2.60.5` | ✅ A+ grade |

Both IPs belong to **AWS Global Accelerator**, which routes to your backend EC2 instances.
**One instance has no SSL cert configured**, so ~50% of requests fail.

**The fix:** Remove Global Accelerator from the picture entirely.
For a static React site, the correct architecture is:

```
User → Route 53 → CloudFront (HTTPS + A+ SSL) → S3 (private bucket)
```

CloudFront handles SSL via a **free ACM certificate** — no EC2, no Global Accelerator, no SSL cert management.

---

## Step-by-Step Fix

### Step 1 — Request a Free SSL Certificate (ACM)

> ⚠️ CloudFront certs MUST be requested in **us-east-1** (N. Virginia)

```bash
aws acm request-certificate \
  --domain-name mmandas.com \
  --subject-alternative-names www.mmandas.com \
  --validation-method DNS \
  --region us-east-1
```

This returns a Certificate ARN like:
`arn:aws:acm:us-east-1:123456789:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

Then go to **ACM Console → Certificates → your cert → Create DNS records in Route 53**
(one click — Route 53 adds the CNAME validation records automatically)

Wait ~2 minutes for validation ✅

---

### Step 2 — Deploy the CloudFormation Stack

```bash
aws cloudformation deploy \
  --template-file infrastructure/cloudformation-ssl-fix.yaml \
  --stack-name mmandas-sauces \
  --region us-east-1 \
  --parameter-overrides \
    CertificateArn=arn:aws:acm:us-east-1:YOUR_ACCOUNT:certificate/YOUR_CERT_ID \
    DomainName=mmandas.com \
    WWWDomainName=www.mmandas.com
```

Stack creates:
- ✅ Private S3 bucket (no public access)
- ✅ CloudFront distribution with your SSL cert
- ✅ Origin Access Control (only CloudFront can read S3)
- ✅ Forced HTTPS redirect
- ✅ SPA routing (all 404s → index.html)

---

### Step 3 — Deploy the Website

```bash
# Make script executable
chmod +x infrastructure/deploy.sh

# Build and deploy
./infrastructure/deploy.sh
```

This will:
1. Build your React app (`npm run build`)
2. Upload to S3 with correct cache headers
3. Invalidate CloudFront cache

---

### Step 4 — Update Route 53 DNS

After CloudFormation completes, get your CloudFront domain:

```bash
aws cloudformation describe-stacks \
  --stack-name mmandas-sauces \
  --region us-east-1 \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDomain'].OutputValue" \
  --output text
# Returns something like: d1abc123xyz.cloudfront.net
```

In **Route 53 → Hosted Zone → mmandas.com**:

| Record | Type | Value |
|--------|------|-------|
| `mmandas.com` | A (Alias) | → CloudFront distribution |
| `www.mmandas.com` | A (Alias) | → CloudFront distribution |

**Delete** the old A records pointing to Global Accelerator IPs.

---

### Step 5 — Remove Global Accelerator (Optional but Recommended)

Global Accelerator is designed for **dynamic applications** (APIs, gaming, real-time).
For a static React site it adds cost and complexity with zero benefit.

```bash
# List your accelerators
aws globalaccelerator list-accelerators --region us-west-2

# Delete (replace with your accelerator ARN)
aws globalaccelerator delete-accelerator \
  --accelerator-arn arn:aws:globalaccelerator::YOUR_ACCOUNT:accelerator/YOUR_ID \
  --region us-west-2
```

> CloudFront already has 450+ edge locations globally — it IS your global accelerator.

---

## Architecture: Before vs After

### ❌ Before (broken)
```
User → Route 53 → Global Accelerator → EC2 Instance A (✅ SSL)
                                      → EC2 Instance B (❌ No SSL) ← 50% of users get error
```

### ✅ After (fixed)
```
User → Route 53 → CloudFront (A+ SSL via ACM) → S3 (private bucket)
```

---

## Cost Comparison

| Service | Before | After |
|---------|--------|-------|
| Global Accelerator | ~$18/month base + data transfer | ❌ Removed |
| EC2 instances | ~$10-30/month | ❌ Removed |
| S3 | - | ~$0.50/month |
| CloudFront | - | ~$1-2/month |
| ACM Certificate | - | **Free** |
| **Total** | **~$30-50/month** | **~$2/month** |

---

## Verify the Fix

After DNS propagates (~5 minutes):

```bash
# Should return HTTP 301 redirect to HTTPS
curl -I http://mmandas.com

# Should return HTTP 200 with SSL
curl -I https://mmandas.com

# Check SSL grade (should be A+)
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=mmandas.com&hideResults=on
```

---

## Future Deployments

Every time you update the site:
```bash
./infrastructure/deploy.sh
```

That's it. No server management, no SSL renewals (ACM auto-renews), no downtime.
