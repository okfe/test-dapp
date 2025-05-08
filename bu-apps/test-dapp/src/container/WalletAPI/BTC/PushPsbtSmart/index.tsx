import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Input, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const PushPsbtSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [signedPsbt, setSignedPsbt] = useState('');

  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignedPsbt(e.target.value);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    return `try {
        let res = await ${getProviderCodeString(network)}.pushPsbt('${signedPsbt ? signedPsbt : '70736274ff01007d...'}');
          console.log(res);
        } catch (e) {
          console.log(e);
        }`;
  }, [signedPsbt, network]);

  return (
    <PreviewLayout previewData={result}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Connector onError={onCallback} />
        <Input value={signedPsbt} onChange={onChange} placeholder="填写 PSBT" />
        <APIButton
          apiName="pushPsbt"
          onCallback={onCallback}
          params={[signedPsbt]}
        />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default PushPsbtSmart;
