/**
 * Configuration template for Claude Server
 *
 * Copy this file to config.ts and fill in your actual values.
 * config.ts is gitignored to keep your secrets safe.
 */

export interface Config {
  // Your subdomain for code-server (e.g., dev.yourdomain.com)
  domain: string;

  // Route 53 Hosted Zone ID for your domain
  hostedZoneId: string;

  // Password to access code-server web interface
  codeServerPassword: string;

  // Email for Let's Encrypt certificate notifications
  email: string;

  // EC2 Key Pair name for SSH access (must exist in AWS)
  keyPairName: string;

  // EC2 instance type (t4g.micro or t4g.small recommended)
  instanceType: string;

  // EBS volume size in GB
  volumeSize: number;
}

export const config: Config = {
  domain: 'dev.example.com',
  hostedZoneId: 'ZXXXXXXXXXXXXX',
  codeServerPassword: 'change-me-with-strong-password',
  email: 'your@email.com',
  keyPairName: 'your-key-pair-name',
  instanceType: 't4g.small',
  volumeSize: 30,
};
