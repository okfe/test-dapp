const router = {
  name: 'Wallet BTC API',
  path: '/wallet-btc-api',
  routes: [
    {
      name: 'connect',
      path: '/wallet-btc-api/connect',
      component: './WalletAPI/BTC/Connect',
    },
    {
      name: 'getBalance',
      path: '/wallet-btc-api/getBalance',
      component: './WalletAPI/BTC/GetBalance',
    },
    {
      name: 'pushPsbt',
      path: '/wallet-btc-api/pushPsbt',
      component: './WalletAPI/BTC/PushPsbt',
    },
    {
      name: 'pushTx',
      path: '/wallet-btc-api/pushTx',
      component: './WalletAPI/BTC/PushTx',
    },
    {
      name: 'sendBitcoin',
      path: '/wallet-btc-api/sendBitcoin',
      component: './WalletAPI/BTC/SendBitcoin',
    },
    {
      name: 'signMessage',
      path: '/wallet-btc-api/signMessage',
      component: './WalletAPI/BTC/SignMessage',
    },
    {
      name: 'signPsbt',
      path: '/wallet-btc-api/signPsbt',
      component: './WalletAPI/BTC/SignPsbt',
    },
    {
      name: 'signPsbts',
      path: '/wallet-btc-api/signPsbts',
      component: './WalletAPI/BTC/SignPsbts',
    },
    {
      name: 'getInscriptions',
      path: '/wallet-btc-api/getInscriptions',
      component: './WalletAPI/BTC/GetInscriptions',
    },
    {
      name: 'sendInscription',
      path: '/wallet-btc-api/sendInscription',
      component: './WalletAPI/BTC/SendInscription',
    },
    {
      name: 'inscribe',
      path: '/wallet-btc-api/inscribe',
      component: './WalletAPI/BTC/Inscribe',
    },
    {
      name: 'mint',
      path: '/wallet-btc-api/mint',
      component: './WalletAPI/BTC/Mint',
    },
    {
      name: 'splitUtxo',
      path: '/wallet-btc-api/splitUtxo',
      component: './WalletAPI/BTC/SplitUtxo',
    },
    {
      name: 'transferNft',
      path: '/wallet-btc-api/transferNft',
      component: './WalletAPI/BTC/TransferNft',
    },
  ],
};
export default router;
