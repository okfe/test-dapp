// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<{
  name: string;
  avatar: string;
}> {
  return {
    name: 'OKXer',
    avatar: 'https://static.okx.com/cdn/assets/imgs/248/0125BBCCBD2DB8E0.png',
  };
}

export const layout = () => {
  return {
    logo: 'https://static.okx.com/cdn/assets/imgs/248/0125BBCCBD2DB8E0.png',
    menu: {
      locale: false,
      defaultOpenAll: true,
      autoClose: false,
    },
    title: 'Extension Dapp demo',
  };
};
