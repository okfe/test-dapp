import APIButton from '@/components/common/APIButton';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Input, Row, Space } from 'antd';
import React, { useState } from 'react';

const PushPsbtSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [signedPsbt, setSignedPsbt] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e) => {
    setSignedPsbt(e.target.value);
  };

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Connector onError={onCallback} />
          <Input
            value={signedPsbt}
            onChange={onChange}
            placeholder="填写PSBT"
          />
          <APIButton
            apiName="pushPsbt"
            onCallback={onCallback}
            params={[signedPsbt]}
          />
        </Space>
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default PushPsbtSmart;
