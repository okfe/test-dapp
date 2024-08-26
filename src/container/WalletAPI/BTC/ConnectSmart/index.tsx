import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Row } from 'antd';
import { Space } from 'antd/lib';
import React, { useMemo, useState } from 'react';

const ConnectSmart: React.FC = () => {
  const [data, setData] = useState({});
  const onCallback = (result: object) => {
    setData(result);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    return `try {
      let res = await ${getProviderCodeString(network)}.connect();
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [network]);

  return (
    <PreviewLayout previewData={data}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row>
          <Connector onError={onCallback} />
        </Row>
        <APIButton apiName="connect" onCallback={onCallback} />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default ConnectSmart;
