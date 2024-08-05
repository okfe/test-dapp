import { ConnectButton, Connector } from '@ant-design/web3';
import {
  BitcoinWeb3ConfigProvider,
  OkxWallet,
  UnisatWallet,
  XverseWallet,
} from '@ant-design/web3-bitcoin';
import { Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './Guide.less';

interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          欢迎使用 <strong>{name}</strong> ！
        </Typography.Title>
      </Row>
      <Row>
        <BitcoinWeb3ConfigProvider
          autoConnect
          wallets={[XverseWallet(), UnisatWallet(), OkxWallet()]}
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

export default Guide;
