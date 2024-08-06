import extractPsbt from '@/temporaryFunc/extractPsbt';
import generatePsbt from '@/temporaryFunc/generatePsbt';
import { ConnectButton, Connector } from '@ant-design/web3';

import {
  BitcoinWeb3ConfigProvider,
  OkxWallet,
  UnisatWallet,
  XverseWallet,
} from '@ant-design/web3-bitcoin';
import { WalletColorful } from '@ant-design/web3-icons';
import { Button, Layout, Row, Typography } from 'antd';
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
            <ConnectButton icon={<WalletColorful />} />
          </Connector>
        </BitcoinWeb3ConfigProvider>
        <Button
          onClick={async () => {
            const psbt = await generatePsbt(
              [
                {
                  txid: 'a88608dec3ab35aa55461eb85f557d0a622f64fe6ecbe96bf14e37e5075b64fd',
                  vout: 0,
                },
              ],
              [
                {
                  address: '19V8zGTSdLAnzaoje8U3HP7KSbkQJBw42s',
                  value: 9000,
                },
              ],
            );
            console.log('psbt', psbt);
            const signedPsbt = await window.okxwallet.bitcoin.signPsbt(psbt);
            const rawTx = await extractPsbt(signedPsbt);
            console.log('rawTx', rawTx);
          }}
        >
          generatePsbt
        </Button>
      </Row>
    </Layout>
  );
};

export default PSBTSmart;
