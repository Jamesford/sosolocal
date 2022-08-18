import fs from 'node:fs'
import forge from 'node-forge'

export function sslOptions(options) {
  if (!options.cert || !options.key) {
    return generateSelfSignedCert()
  } else {
    return {
      key: fs.readFileSync(options.key, 'utf8'),
      cert: fs.readFileSync(options.cert, 'utf8'),
    }
  }
}

function generateSelfSignedCert() {
  const keys = forge.pki.rsa.generateKeyPair(2048)
  const cert = forge.pki.createCertificate()

  cert.publicKey = keys.publicKey
  cert.serialNumber = '01'
  cert.validity.notBefore = new Date()
  cert.validity.notAfter = new Date()
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)
  const attrs = [
    { name: 'commonName', value: 'example.org' },
    { name: 'countryName', value: 'US' },
    { shortName: 'ST', value: 'Virginia' },
    { name: 'localityName', value: 'Blacksburg' },
    { name: 'organizationName', value: 'Test' },
    { shortName: 'OU', value: 'Test' },
  ]
  cert.setSubject(attrs)
  cert.setIssuer(attrs)
  cert.sign(keys.privateKey)

  const pem_key = forge.pki.privateKeyToPem(keys.privateKey)
  const pem_cert = forge.pki.certificateToPem(cert)

  return {
    key: pem_key,
    cert: pem_cert,
  }
}
