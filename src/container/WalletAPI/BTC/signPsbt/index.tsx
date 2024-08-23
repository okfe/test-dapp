import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { BTC_SWITCH, getProviderCodeString } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Col, Input, Row, Space } from 'antd';
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
    network: model.networkSwitches[BTC_SWITCH],
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
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Connector onError={onCallback} />
          </Row>
          <Input value={psbt} onChange={onChange} placeholder="填写PSBT" />
          <APIButton
            apiName="signPsbt"
            onCallback={onCallback}
            params={[psbt]}
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

export default SignPsbtSmart;
