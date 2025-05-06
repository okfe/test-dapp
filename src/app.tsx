import GlobalTools from './components/common/GlobalTools';
import './index.less';
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<{
  name: string;
  avatar: string;
}> {
  return {
    name: '',
    avatar: '',
  };
}

export const layout = () => {
  return {
    logo: 'https://static.okx.com/cdn/assets/imgs/248/0125BBCCBD2DB8E0.png',
    menu: {
      locale: false,
      defaultOpenAll: false,
      autoClose: false,
    },
    layout: 'mix',
    rightContentRender: () => <GlobalTools />,
    title: 'OKXWallet Test Dapp',
  };
};
