import { ConnectButton, Connector } from '@ant-design/web3';
import {
  BitcoinWeb3ConfigProvider,
  OkxWallet,
  UnisatWallet,
  XverseWallet,
} from '@ant-design/web3-bitcoin';
import { Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './index.less';

// 脚手架示例组件
const PSBTSmart: React.FC = () => {
  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          快速构建 PSBT!
        </Typography.Title>
      </Row>
      <Row>
        <BitcoinWeb3ConfigProvider
          autoConnect
          wallets={[OkxWallet(), XverseWallet(), UnisatWallet()]}
        >
          <Connector
            modalProps={{
              group: false,
              mode: 'simple',
            }}
          >
            <ConnectButton />
          </Connector>
        </BitcoinWeb3ConfigProvider>
      </Row>
    </Layout>
  );
};

export default PSBTSmart;
