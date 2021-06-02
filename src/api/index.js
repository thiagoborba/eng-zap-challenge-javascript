export const PROPRIETIES_ENDPOINT = 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json'

export async function getProperties () {
  return await fetch(PROPRIETIES_ENDPOINT).then(resp => resp.json())
}