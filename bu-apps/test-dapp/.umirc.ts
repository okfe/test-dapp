import { defineConfig } from '@umijs/max';
import router from './src/routes';

// 目前静态 layout.xxx 配置只支持以下属性：title / formatMessage / locale ，其他 layout 组件的配置均需通过 src/app.ts 中 export const layout 运行时进行配置，配置项可参考 ProLayout
export default defineConfig({
  base: '',
  publicPath: '/assets/test-dapp/',
  history: {
    type: 'hash',
  },
  antd: {
    dark: true,
  },
  // history: { type: 'hash' }, // todo: got error when basename is not empty
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'OKXWallet Test Dapp',
  },
  favicons: ['https://static.okx.com/cdn/assets/imgs/248/0125BBCCBD2DB8E0.png'],
  jsMinifier: 'terser',
  routes: router,
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
