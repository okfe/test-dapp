import CodeBox from '@/components/common/CodeBox';
import Layout from '@/components/common/Layout';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { Row, Space } from 'antd';
import { useMemo } from 'react';

function Ton() {
  const wallet = useTonWallet();

  const demo = useMemo(() => {
    return `
      // connect with okxwallet
      // then useTonWallet() will get the wallet info
    `;
  }, []);

  return (
    <Layout previewData={wallet || {}}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row>
          <Space direction="vertical" style={{ width: '100%' }}>
            <TonConnectButton />
            {/* <SignTransaction /> */}
            {/* <BlackAddress address={tonBlackAddress} /> */}
          </Space>
        </Row>
        <CodeBox text={demo} />
      </Space>
    </Layout>
  );
}

export default Ton;
