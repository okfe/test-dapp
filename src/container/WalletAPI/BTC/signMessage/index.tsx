import APIButton from '@/components/common/APIButton';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Input, Row, Space } from 'antd';
import React, { useState } from 'react';

const SignMessageSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [message, setMessage] = useState('');
  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e) => {
    setMessage(e.target.value);
  };

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
        </Space>
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default SignMessageSmart;
