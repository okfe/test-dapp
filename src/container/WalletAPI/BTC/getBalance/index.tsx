import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Row, Space } from 'antd';
import React, { useState } from 'react';

const demo = `try {
  let res = await okxwallet.bitcoin.getBalance();
  console.log(res)
} catch (e) {
  console.log(e);
}`;

const GetBalanceSmart: React.FC = () => {
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
          <APIButton apiName="getBalance" onCallback={onCallback} />
          <CodeBox text={demo} />
        </Space>
      </Col>
      <Col span={12}>
        <PreviewBox value={data} />
      </Col>
    </Row>
  );
};

export default GetBalanceSmart;
