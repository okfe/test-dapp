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
      name: 'PSBT',
      path: '/psbt',
      component: './Tools/PSBT',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});
