import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { BTC_SWITCH, getProviderCodeString } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Col, Input, Row, Space } from 'antd';
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
    network: model.networkSwitches[BTC_SWITCH],
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
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Connector onError={onCallback} />
          </Row>
          <Input value={rawTx} onChange={onChange} placeholder="填写 RawTx" />
          <APIButton
            apiName="pushTx"
            onCallback={onCallback}
            params={[rawTx]}
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

export default PushTxSmart;
