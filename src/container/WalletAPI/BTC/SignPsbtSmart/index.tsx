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
  const [optionJson, setOptionJson] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPsbt(e.target.value);
  };
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionJson(e.target.value);
  };
  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    const needSignPsbt = psbt ? `${psbt}` : '70736274ff01007d....';
    return `try {
      let res = await ${getProviderCodeString(network)}.signPsbt(
        '${needSignPsbt}', ${optionJson}
      );
      console.log(res)
    } catch (e) {
        console.log(e);
    }`;
  }, [network, psbt]);

  const computedParams = useMemo(()=>{
    if(optionJson) {
      try {
        return [psbt, JSON.parse(optionJson)]
      } catch {
        return [psbt]
      }
    }
  },[psbt, optionJson])

  return (
    <PreviewLayout previewData={result}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Connector onError={onCallback} />
        <Input value={psbt} onChange={onChange} placeholder="填写PSBT" />
        <Input.TextArea rows={6} value={optionJson} onChange={onOptionChange} placeholder="填写Option(JSON字符串形式)" />
        <APIButton apiName="signPsbt" onCallback={onCallback} params={computedParams} />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default SignPsbtSmart;
