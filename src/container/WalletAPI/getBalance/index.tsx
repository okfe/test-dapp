import PreviewBox from '@/components/common/PreviewBox';
import { SmileOutlined } from '@ant-design/icons';
import { ConnectButton, Connector } from '@ant-design/web3';
import { WalletColorful } from '@ant-design/web3-icons';
import { Button, Col, Row, Typography } from 'antd';

import React, { useState } from 'react';

const GetBalanceSmart: React.FC = () => {
  const [data, setData] = useState({});
  const onClick = async () => {
    // setData({ 操作中: '⏳⏳⏳⏳' });
    try {
      const result = await window.okxwallet.bitcoin.getBalance();
      setData(result);
    } catch (error) {
      setData({ error });
    }
  };

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Connector
            modalProps={{
              group: false,
              mode: 'simple',
            }}
          >
            <ConnectButton icon={<WalletColorful />} />
          </Connector>
        </Row>
        <Typography.Title level={4}></Typography.Title>
        <Button
          title="Test getBalance"
          onClick={onClick}
          icon={<SmileOutlined />}
        >
          Test getBalance
        </Button>
      </Col>
      <Col span={12}>
        <PreviewBox value={data} />
      </Col>
    </Row>
  );
};

export default GetBalanceSmart;
