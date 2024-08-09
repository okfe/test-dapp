import APIButton from '@/components/common/APIButton';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Input, Row } from 'antd';
import React, { useState } from 'react';

const SignPsbtSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [psbt, setPsbt] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e) => {
    setPsbt(e.target.value);
  };

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Connector onError={onCallback} />
        </Row>
        <Input value={psbt} onChange={onChange} placeholder="填写PSBT" />
        <APIButton apiName="signPsbt" onCallback={onCallback} params={psbt} />
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default SignPsbtSmart;
