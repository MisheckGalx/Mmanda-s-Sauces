# Mmanda’s Sauces 🌶️  
**Premium handcrafted hot sauces from Clayville, South Africa**  
*Pure flavor. No artificial ingredients. No preservatives.*

Mmanda’s Sauces (pronounced **“Amanda’s”**) is a growing South African food brand focused on bold, natural, preservative-free hot sauces.  
This repository documents the **design, development, and cloud deployment** of the official Mmanda’s Sauces website using **Amazon Web Services (AWS)**.

This project demonstrates **real-world cloud engineering skills**, production decision-making, and a clean, scalable architecture suitable for startups and small businesses.

---

## 🔍 Project Summary (For Investors & Recruiters)

- **Project Type:** Production static website
- **Cloud Provider:** Amazon Web Services (AWS)
- **Hosting Model:** Serverless (S3 + CloudFront)
- **Primary Goals:**
  - Establish a professional online presence
  - Ensure high availability and fast performance
  - Minimize operational and hosting costs
  - Enable future scalability without re-architecture

The solution uses **AWS best practices** to deliver a secure, cost-effective, and globally accessible website.

---

## 🏗️ AWS Architecture Overview

### High-Level Architecture Diagram (AWS-Style)


---

## 🧠 Architecture Design Rationale

### Why Serverless?
- No backend servers to manage
- Zero infrastructure maintenance
- Scales automatically with traffic
- Extremely low cost for early-stage businesses

### Why Amazon S3?
- 99.999999999% durability
- Native static website hosting
- Simple deployment model
- Ideal for brand landing pages

### Why CloudFront?
- Low latency global delivery
- Built-in HTTPS via ACM
- Protects S3 from direct public exposure
- Production-grade performance (Apple/Nike-style delivery)

---

## 🌐 Networking & DNS

### DNS Layer (Route 53)
- Public hosted zone for `mmandassauces.co.za`
- Alias records pointing to CloudFront
- High-availability DNS resolution

### Traffic Flow
1. User requests `https://www.mmandassauces.co.za`
2. DNS resolves via Route 53
3. Request served from nearest CloudFront edge
4. CloudFront fetches content from S3 if not cached

---

## 🔐 Security Architecture

| Layer | Implementation |
|-----|----------------|
| Transport Security | HTTPS (TLS) via ACM |
| Origin Security | CloudFront → S3 only |
| Attack Surface | Static content only |
| Data Risk | No customer data stored |

**Security Principle Applied:**  
> *Least privilege, minimal exposure, no unnecessary services.*

---

## 📁 Project Structure


---

## 🚀 Deployment Process (Production)

1. Build static website (HTML/CSS)
2. Create S3 bucket matching domain name
3. Enable static website hosting
4. Apply public-read or CloudFront-only bucket policy
5. Upload website assets
6. Create CloudFront distribution
7. Request SSL certificate (ACM)
8. Configure Route 53 DNS records
9. Validate HTTPS and caching behavior

---

## 💰 Cost Considerations

| Service | Monthly Cost (Estimated) |
|------|--------------------------|
| Amazon S3 | Very low (storage-based) |
| CloudFront | Usage-based |
| Route 53 | Minimal |
| ACM | Free |

This architecture is **startup-friendly and investor-efficient**.

---

## 🛒 Business Context

### Flagship Product
**Plain Hot – R35**  
Authentic heat with clean ingredients.

Available in:
- Plain Hot
- Creamy Hot

### Distribution
- Clayville & surrounding areas
- Local delivery
- WhatsApp & direct orders

---

## 📈 Scalability & Future Roadmap

This architecture supports:
- Traffic growth without changes
- SEO & analytics integration
- Instagram feed embedding
- Migration to:
  - API Gateway + Lambda
  - DynamoDB / RDS
  - Full e-commerce platform

No redesign required to scale.

---

## 🧑🏾‍💻 Case Study Summary (Portfolio)

**Problem:**  
Launch a professional online presence with minimal cost and maximum reliability.

**Solution:**  
Serverless static website hosted on AWS S3, accelerated by CloudFront, secured with HTTPS, and routed via Route 53.

**Outcome:**  
- Fast, reliable, globally accessible website
- Zero server management
- Production-grade cloud architecture
- Easily extensible for future growth

---

## 🌍 Live Website

🔗 https://www.mmandassauces.co.za

---

## 🧠 Key Skills Demonstrated

- AWS S3 Static Website Hosting
- CloudFront CDN configuration
- DNS management with Route 53
- SSL/TLS via ACM
- Cloud architecture design
- Security best practices
- Startup-focused infrastructure decisions

---

**Maintained by:**  
*Mmanda’s Sauces — Clayville, South Africa*  
Handcrafted. Authentic. Bold.
