import APIButton from '@/components/common/APIButton';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Row } from 'antd';
import React, { useState } from 'react';

const ConnectSmart: React.FC = () => {
  const [data, setData] = useState({});
  const onCallback = (result: object) => {
    setData(result);
  };

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Connector onError={onCallback} />
        </Row>
        <APIButton apiName="connect" onCallback={onCallback} />
      </Col>
      <Col span={12}>
        <PreviewBox value={data} />
      </Col>
    </Row>
  );
};

export default ConnectSmart;
