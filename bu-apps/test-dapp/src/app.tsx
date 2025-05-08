import { useLocation, useNavigate } from '@umijs/max';
import { Menu } from 'antd';
import { ApiOutlined, AppstoreOutlined } from '@ant-design/icons';
import 'antd-mobile/es/global';
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
  // 这里用函数组件包裹，保证 hooks 可用
  const HeaderButtons = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
      <Menu 
        mode="horizontal" 
        selectedKeys={[location.pathname === '/wallet-cases' ? 'cases' : 'api']}
        style={{ backgroundColor: 'transparent', border: 'none' }}
      >
        <Menu.Item key="api" onClick={() => navigate('/')} icon={<ApiOutlined />}>
          API
        </Menu.Item>
        <Menu.Item key="cases" onClick={() => navigate('/wallet-cases')} icon={<AppstoreOutlined />}>
          Cases
        </Menu.Item>
      </Menu>
    );
  };

  return {
    logo: 'https://static.okx.com/cdn/assets/imgs/248/0125BBCCBD2DB8E0.png',
    menu: {
      locale: false,
      defaultOpenAll: false,
      autoClose: false,
    },
    layout: 'mix',
    rightContentRender: () => <GlobalTools />,
    headerContentRender: () => <HeaderButtons />,
    title: 'OKXWallet Test Dapp',
  };
};
