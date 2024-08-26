const router = {
  name: 'Wallet TON API',
  path: '/wallet-ton-api',
  routes: [
    {
      name: 'connect',
      path: '/wallet-ton-api/connect',
      component: './WalletAPI/Ton/Connect',
    },
    {
      name: 'restoreConnection',
      path: '/wallet-ton-api/restoreConnection',
      component: './WalletAPI/Ton/RestoreConnection',
    },
    {
      name: 'disconnect',
      path: '/wallet-ton-api/disconnect',
      component: './WalletAPI/Ton/Disconnect',
    },
    {
      name: 'send',
      path: '/wallet-ton-api/send',
      component: './WalletAPI/Ton/Send',
    },
    {
      name: 'Case: TonConnect',
      path: '/wallet-ton-api/tonconnect',
      component: './WalletAPI/Ton/TonConnect',
    },
  ],
};

export default router;
