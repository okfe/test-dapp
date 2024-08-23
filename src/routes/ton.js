const router = {
  name: 'Wallet TON API',
  path: '/wallet-ton-api',
  routes: [
    {
      name: 'connect',
      path: '/wallet-ton-api/connect',
      component: './WalletAPI/TON/Connect',
    },
  ],
};

export default router;
