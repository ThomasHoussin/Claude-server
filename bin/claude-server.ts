#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { ClaudeServerStack } from '../lib/claude-server-stack.js';
import { config } from '../config/config.js';

/**
 * Validate that SSM parameter exists before deployment
 */
async function validateSsmParameter(): Promise<void> {
  const client = new SSMClient({ region: config.region });

  try {
    await client.send(new GetParameterCommand({
      Name: config.ssmPasswordParameterName,
      WithDecryption: false, // Just check existence, don't need the value
    }));
    console.log(`✓ SSM parameter validated: ${config.ssmPasswordParameterName}`);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ParameterNotFound') {
      console.error(`\n❌ ERROR: SSM parameter not found: ${config.ssmPasswordParameterName}\n`);
      console.error('Create it with:');
      console.error(`  aws ssm put-parameter \\`);
      console.error(`    --name "${config.ssmPasswordParameterName}" \\`);
      console.error(`    --type SecureString \\`);
      console.error(`    --value "your-secure-password" \\`);
      console.error(`    --region ${config.region}\n`);
      process.exit(1);
    }
    throw error;
  }
}

// Validate SSM parameter before synthesis
await validateSsmParameter();

const app = new App();

new ClaudeServerStack(app, 'ClaudeServerStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: config.region,
  },
  description: 'Remote development environment with code-server and Claude Code',
});
