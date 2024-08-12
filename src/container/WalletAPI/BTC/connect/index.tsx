import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Row } from 'antd';
import { Space } from 'antd/lib';
import React, { useState } from 'react';

const demo = `try {
  let res = await okxwallet.bitcoin.connect();
  console.log(res)
} catch (e) {
  console.log(e);
}`;

const ConnectSmart: React.FC = () => {
  const [data, setData] = useState({});
  const onCallback = (result: object) => {
    setData(result);
  };

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Connector onError={onCallback} />
          </Row>
          <APIButton apiName="connect" onCallback={onCallback} />
          <CodeBox text={demo} />
        </Space>
      </Col>
      <Col span={12}>
        <PreviewBox value={data} />
      </Col>
    </Row>
  );
};

export default ConnectSmart;
