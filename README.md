📄 **[See the full AWS deployment writeup, architecture diagram, and screenshots →](docs/AWS-DEPLOYMENT.md)**


# Mmanda's Sauces

Handcrafted hot sauces from Clayville, South Africa. Bold, natural, no preservatives.

Production site: [mmandas.com](https://mmandas.com)

This repo is also where I document a side deployment of the same site on AWS, as a cloud infrastructure portfolio piece — see below.

## Stack

- React + Vite storefront (`client/`)
- Express + SQLite API for the admin panel (`server/`)
- Deployed on Netlify (production) and separately on AWS (portfolio)

## AWS deployment

I rebuilt the deployment side of this project on AWS to practice real infrastructure work — S3, CloudFront, IAM, CloudFormation.

**Live:** https://demo.mmandas.com

- Static build stored in a private S3 bucket
- Served through CloudFront (CDN + HTTPS)
- Bucket locked down with Origin Access Control — nothing is publicly reachable except through CloudFront
- HTTPS cert issued and validated through ACM
- Whole stack defined in `infrastructure/cloudformation-quickstart.yaml` and deployed with one command

Full write-up with architecture diagram and screenshots: [`docs/AWS-DEPLOYMENT.md`](docs/AWS-DEPLOYMENT.md)

Note: the `/admin` panel needs the Express API, which isn't part of this static deployment — it's a separate piece I'm planning to containerize and deploy next.

## Products

- Plain Hot — R35
- Creamy Hot — R35

Clayville and surrounding areas. Local delivery, WhatsApp orders.
