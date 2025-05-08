import { Space } from 'antd';
import { Tabs } from 'antd-mobile';

import Evm from './chains/Evm';
import NEAR from './chains/NEAR';
import Solana from './chains/Solana';
import Sui from './chains/Sui';
import Ton from './chains/Ton';
import Tron from './chains/Tron';
import ProjectInfo from './components/ProjectInfo';

const localTabKey = 'localTabKey';

const tabs = [Evm, Tron, Solana, NEAR, Ton, Sui];

const cachedChainKey = localStorage.getItem(localTabKey);
const isValidDefaultActiveKey = tabs.some(({ key }) => cachedChainKey === key);
const defaultActiveKey = isValidDefaultActiveKey ? cachedChainKey : Evm.key;

export default function App() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(target) => {
          localStorage.setItem(localTabKey, target);
        }}
        style={{
          '--fixed-content': true,
          '--content-padding': '15px 0',
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Tab title={tab.key} key={tab.key}>
            {tab.children}
          </Tabs.Tab>
        ))}
      </Tabs>
      <ProjectInfo />
    </Space>
  );
}
