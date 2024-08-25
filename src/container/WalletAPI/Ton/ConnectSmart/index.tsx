import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import Layout from '@/components/common/Layout';
import {
  getProviderCodeString,
  Network,
  NetworkSwitch,
} from '@/constants/network';
import { manifestUrl } from '@/constants/Ton';
import { Row, Space } from 'antd';
import { useMemo, useState } from 'react';

function Ton() {
  const [data, setData] = useState({});
  const onCallback = (result: object) => {
    setData(result);
  };
  const demo = useMemo(() => {
    return `
    // connect with okxwallet be like this
    try {
      let res = await ${getProviderCodeString(Network.TON)}.tonconnect.connect(2,{
        manifestUrl: '${manifestUrl}',
        items: [{ name: 'ton_addr' }]
      });
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, []);

  return (
    <Layout previewData={data}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row>
          <Connector
            networkSwitch={NetworkSwitch.TON}
            onError={onCallback}
            params={[2, { manifestUrl, items: [{ name: 'ton_addr' }] }]}
          />
        </Row>
        <APIButton
          apiName="connect"
          networkSwitch={NetworkSwitch.TON}
          onCallback={onCallback}
          params={[2, { manifestUrl, items: [{ name: 'ton_addr' }] }]}
        />
        <CodeBox text={demo} />
      </Space>
    </Layout>
  );
}

export default Ton;
