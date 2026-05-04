import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export async function getDbConfig() {
  const secretArn = process.env.DB_SECRET_ARN;
  if (!secretArn) {
    // Fallback for local development or if not provided
    return {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dbname: process.env.DB_NAME,
    };
  }

  console.log('Fetching secret from SecretsManager...');
  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION || 'us-east-1',
  });
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: secretArn }),
  );
  console.log('Secret fetched successfully!');

  const parsed = JSON.parse(response.SecretString || '{}');
  console.log('DB Config:', {
    host: parsed.host,
    port: parsed.port,
    username: parsed.username,
    dbname: parsed.dbname,
  });
  return parsed;
}
