import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager"

const secret_name = "stylish-env-variable"
const googleAuthSecrets_name = "Stylish_GoogleAuthSecret"
export const secrets: { [key: string]: string } = {}
export const googleAuthSecrets: { [key: string]: string } = {}

export async function getSecrets() {
  const client = new SecretsManagerClient({
    region: "ap-northeast-1",
  })
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT"
      })
    )

    if (response.SecretString !== undefined) {
      const res = JSON.parse(response.SecretString)
      for (const key in res) {
        secrets[key] = res[key]
      }
    }
  } catch (error) {
    console.log('secretManagerError', error)
    throw error
  }
}

export async function getGoogleAuthSecrets() {
  const client = new SecretsManagerClient({
    region: "ap-northeast-1",
  })
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: googleAuthSecrets_name,
        VersionStage: "AWSCURRENT"
      })
    )

    if (response.SecretString !== undefined) {
      const res = JSON.parse(response.SecretString)
      for (const key in res) {
        googleAuthSecrets[key] = res[key]
      }
    }
  } catch (error) {
    console.log('secretManagerError', error)
    throw error
  }
}