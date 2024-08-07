import PreviewBox from '@/components/common/PreviewBox';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';

const ConnectSmart: React.FC = () => {
  const [data, setData] = useState({});
  const onClick = async () => {
    const result = await window.okxwallet.bitcoin.connect();
    setData(result);
  };

  return (
    <Row>
      <Col span={12}>
        <Button title="Test connect" onClick={onClick} icon={<SmileOutlined />}>
          Test connect
        </Button>
      </Col>
      <Col span={12}>
        <PreviewBox value={data} />
      </Col>
    </Row>
  );
};

export default ConnectSmart;
