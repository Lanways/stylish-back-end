import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager"

const execSync = require("child_process").execSync;
const secretName = "stylish-env-variable";
const client = new SecretsManagerClient({ region: "ap-northeast-1" });
const sequelizeCommand = process.argv[2] || "db:migrate"

async function getSecrets() {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName })
    const { SecretString } = await client.send(command);
    if (SecretString) {
      const secrets = JSON.parse(SecretString);
      process.env.DB_USER = secrets.DB_USER;
      process.env.DB_PASS = secrets.DB_PASS;
      process.env.DB_NAME = secrets.DB_NAME;
      process.env.DB_HOST = secrets.DB_HOST;
      execSync(`npx sequelize ${sequelizeCommand}`, { stdio: "inherit" })
    }
  } catch (error) {
    console.error("Error fetching secrets:", error)
    process.exit(1)
  }
}

getSecrets();
