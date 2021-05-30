export async function getProperties () {
  return await fetch('http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json').then(resp => resp.json())
}