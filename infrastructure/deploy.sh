#!/bin/bash
# ============================================================
# Mmanda's Sauces — Deploy Script
# Builds React app and deploys to S3 + invalidates CloudFront
# Usage: ./deploy.sh
# ============================================================

set -e  # Exit on any error

# ── CONFIG (edit these) ──────────────────────────────────────
STACK_NAME="mmandas-sauces"
REGION="us-east-1"          # CloudFront certs MUST be in us-east-1
DOMAIN="mmandas.com"
CLIENT_DIR="./client"
# ────────────────────────────────────────────────────────────

echo "🌶️  Mmanda's Sauces — Deploy Pipeline"
echo "======================================"

# Step 1: Get bucket name and distribution ID from CloudFormation outputs
echo ""
echo "📡 Fetching infrastructure details..."

BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" \
  --output text)

DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
  --output text)

if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo "❌ Could not fetch stack outputs. Is the CloudFormation stack deployed?"
  echo "   Run: aws cloudformation deploy --template-file infrastructure/cloudformation-ssl-fix.yaml --stack-name $STACK_NAME --region $REGION --parameter-overrides CertificateArn=<your-cert-arn>"
  exit 1
fi

echo "✅ Bucket: $BUCKET_NAME"
echo "✅ Distribution: $DISTRIBUTION_ID"

# Step 2: Build the React app
echo ""
echo "🔨 Building React app..."
cd $CLIENT_DIR
npm ci --silent
npm run build
cd ..
echo "✅ Build complete → client/dist/"

# Step 3: Sync to S3
echo ""
echo "☁️  Uploading to S3..."

# Upload HTML files with no-cache (always fresh)
aws s3 sync client/dist/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --delete \
  --exclude "*.js" \
  --exclude "*.css" \
  --exclude "images/*" \
  --cache-control "no-cache, no-store, must-revalidate"

# Upload JS/CSS with long cache (content-hashed filenames)
aws s3 sync client/dist/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --exclude "*" \
  --include "*.js" \
  --include "*.css" \
  --cache-control "public, max-age=31536000, immutable"

# Upload images with long cache
aws s3 sync client/dist/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --exclude "*" \
  --include "images/*" \
  --cache-control "public, max-age=604800"

echo "✅ Upload complete"

# Step 4: Invalidate CloudFront cache
echo ""
echo "🔄 Invalidating CloudFront cache..."

INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*" \
  --query "Invalidation.Id" \
  --output text)

echo "✅ Invalidation started: $INVALIDATION_ID"
echo "   (Takes ~30 seconds to propagate globally)"

# Done
echo ""
echo "🎉 Deploy complete!"
echo "   Live at: https://$DOMAIN"
echo ""
