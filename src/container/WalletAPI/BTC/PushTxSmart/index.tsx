import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Input, Row, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const PushTxSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [rawTx, setRawTx] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawTx(e.target.value);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    return `try {
        let res = await ${getProviderCodeString(network)}.pushTx('${rawTx ? rawTx : '0200000000010135bd7d...'}');
          console.log(res);
        } catch (e) {
          console.log(e);
        }`;
  }, [rawTx, network]);

  return (
    <PreviewLayout previewData={result}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row>
          <Connector onError={onCallback} />
        </Row>
        <Input value={rawTx} onChange={onChange} placeholder="填写 RawTx" />
        <APIButton apiName="pushTx" onCallback={onCallback} params={[rawTx]} />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default PushTxSmart;
