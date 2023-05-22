# Code for provisioning AWS resources and IAC (Infrastructure As Code) will go here
# Terraform special configuration block
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Configuring the AWS Provider
provider "aws" {
  region = "us-east-2"
}