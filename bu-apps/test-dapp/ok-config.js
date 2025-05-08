/**
 * @type {import('@ok/ok-config').OkConfig}
 */
const config = {
  build: {},
  workflow: {
    npm: {
      docResourcePath: './docs',
      docUploadTargetName: 'test-dapp',
    }
  },
}

module.exports = config