import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Input, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const SignPsbtSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [psbt, setPsbt] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPsbt(e.target.value);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    const needSignPsbt = psbt ? `${psbt}` : '70736274ff01007d....';
    return `try {
      let res = await ${getProviderCodeString(network)}.signPsbt(
        '${needSignPsbt}'
      );
      console.log(res)
    } catch (e) {
        console.log(e);
    }`;
  }, [network, psbt]);

  return (
    <PreviewLayout previewData={result}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Connector onError={onCallback} />
        <Input value={psbt} onChange={onChange} placeholder="填写PSBT" />
        <APIButton apiName="signPsbt" onCallback={onCallback} params={[psbt]} />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default SignPsbtSmart;
