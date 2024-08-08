import APIButton from '@/components/common/APIButton';
import PreviewBox from '@/components/common/PreviewBox';
import { ConnectButton, Connector } from '@ant-design/web3';
import { WalletColorful } from '@ant-design/web3-icons';
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
          <Connector
            modalProps={{
              mode: 'simple',
            }}
          >
            <ConnectButton icon={<WalletColorful />} />
          </Connector>
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
