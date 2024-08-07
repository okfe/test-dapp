import { SmileOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';

const ConnectSmart: React.FC = () => {
  const onClick = async () => {
    const result = await window.okxwallet.bitcoin.connect();
    console.log(result);
  };
  return (
    <Space direction="vertical">
      <Button title="Test connect" onClick={onClick} icon={<SmileOutlined />}>
        test connect
      </Button>
    </Space>
  );
};

export default ConnectSmart;
