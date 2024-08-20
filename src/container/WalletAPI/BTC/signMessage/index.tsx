import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { BTC_SWITCH, PROVIDER } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Col, Input, Row, Space } from 'antd';
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
    network: model.networkSwitches[BTC_SWITCH],
  }));

  const demo = useMemo(() => {
    const needSignStr = message ? `${message}` : 'need sign string';
    return `try {
      let res = await okxwallet.${PROVIDER[network]}.signMessage(
      '${needSignStr}'
      );
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [network, message]);

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Connector onError={onCallback} />
          </Row>
          <Input
            value={message}
            onChange={onChange}
            placeholder="填写Message"
          />
          <APIButton
            apiName="signMessage"
            onCallback={onCallback}
            params={[message]}
          />
          <CodeBox text={demo} />
        </Space>
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default SignMessageSmart;
