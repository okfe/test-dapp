import { defineConfig } from '@umijs/max';

// 目前静态 layout.xxx 配置只支持以下属性：title / formatMessage / locale ，其他 layout 组件的配置均需通过 src/app.ts 中 export const layout 运行时进行配置，配置项可参考 ProLayout
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'OKX Wallet Demo',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Home',
      path: '/home',
      component: './Home',
    },
    {
      name: 'PSBT Builder',
      path: '/psbt',
      component: './Tools/PSBT',
    },
    {
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
      ],
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  npmClient: 'pnpm',
  chainWebpack(config, args) {
    // Experiments
    config.experiments({
      asyncWebAssembly: true,
    });

    // Plugins
    config.plugin('provide').use(args.webpack.ProvidePlugin, [
      {
        process: 'process/browser.js',
      },
    ]);
  },
});
