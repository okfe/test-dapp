import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import React, { useMemo, useState } from 'react';

const GetBalanceSmart: React.FC = () => {
  const [data, setData] = useState({});
  const onCallback = (result: object) => {
    setData(result);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    return `try {
      let res = await ${getProviderCodeString(network)}.getBalance();
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [network]);

  return (
    <PreviewLayout previewData={data}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Connector onError={onCallback} />
        <APIButton apiName="getBalance" onCallback={onCallback} />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default GetBalanceSmart;
