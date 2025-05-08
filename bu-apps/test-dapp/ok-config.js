/**
 * @type {import('@ok/ok-config').OkConfig}
 */
const config = {
  build: {},
  workflow: {
    npm: {
      docResourcePath: './dist',
      docUploadTargetName: 'test-dapp',
    }
  },
}

module.exports = config