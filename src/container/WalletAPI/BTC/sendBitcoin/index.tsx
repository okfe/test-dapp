import APIButton from '@/components/common/APIButton';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Input, Row } from 'antd';
import React, { useState } from 'react';

const SendBitcoinSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [signedPsbt, setSignedPsbt] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e) => {
    setSignedPsbt(e.target.value);
  };

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Connector onError={onCallback} />
        </Row>
        <Input value={signedPsbt} onChange={onChange} placeholder="填写PSBT" />
        <APIButton
          apiName="pushPsbt"
          onCallback={onCallback}
          params={signedPsbt}
        />
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default SendBitcoinSmart;
