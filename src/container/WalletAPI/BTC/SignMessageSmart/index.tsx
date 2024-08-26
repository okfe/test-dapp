import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { NetworkSwitch, getProviderCodeString } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Input, Row, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const SignMessageSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [message, setMessage] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    const needSignStr = message ? `${message}` : 'need sign string';
    return `try {
      let res = await ${getProviderCodeString(network)}.signMessage(
      '${needSignStr}'
      );
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [network, message]);

  return (
    <PreviewLayout previewData={result}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row>
          <Connector onError={onCallback} />
        </Row>
        <Input value={message} onChange={onChange} placeholder="填写Message" />
        <APIButton
          apiName="signMessage"
          onCallback={onCallback}
          params={[message]}
        />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default SignMessageSmart;
