variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "region" {
  description = "The name of the aws region"
  type        = string
}

provider "aws" {
  region = var.region
}


data "aws_s3_bucket" "existing_bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket" "static_site" {
  count  = length(data.aws_s3_bucket.existing_bucket.id) == 0 ? 1 : 0

  bucket = var.bucket_name
  acl    = "private"

  versioning {
    enabled = true
  }

  tags = {
    Name        = "StaticSite"
    Environment = "Production"
  }
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "Origin Access Identity for CloudFront"
}

resource "aws_s3_bucket_policy" "static_site_policy" {
  count  = length(aws_s3_bucket.static_site) > 0 ? 1 : 0
  bucket = aws_s3_bucket.static_site[0].id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.oai.iam_arn
        },
        Action   = "s3:GetObject",
        Resource = "${aws_s3_bucket.static_site[0].arn}/*"
      }
    ]
  })
}

resource "aws_cloudfront_distribution" "static_site_cdn" {
  count  = length(aws_s3_bucket.static_site) > 0 ? 1 : 0
  origin {
    domain_name = aws_s3_bucket.static_site[0].bucket_regional_domain_name
    origin_id   = "S3-static-site"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-static-site"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400

    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  price_class = "PriceClass_100"
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.static_site_cdn[0].domain_name
}
