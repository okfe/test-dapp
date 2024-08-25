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
      name: 'TonConnect',
      path: '/wallet-ton-api/tonconnect',
      component: './WalletAPI/Ton/TonConnect',
    },
  ],
};

export default router;
