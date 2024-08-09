import APIButton from '@/components/common/APIButton';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Input, Row } from 'antd';
import React, { useState } from 'react';

const PushTxSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [rawTx, setRawTx] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e) => {
    setRawTx(e.target.value);
  };

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Connector onError={onCallback} />
        </Row>
        <Input value={rawTx} onChange={onChange} placeholder="填写RawTx" />
        <APIButton apiName="pushTx" onCallback={onCallback} params={rawTx} />
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default PushTxSmart;
