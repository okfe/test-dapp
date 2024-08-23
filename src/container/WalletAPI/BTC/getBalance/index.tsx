import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { BTC_SWITCH, getProviderCodeString } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Col, Row, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const GetBalanceSmart: React.FC = () => {
  const [data, setData] = useState({});
  const onCallback = (result: object) => {
    setData(result);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[BTC_SWITCH],
  }));

  const demo = useMemo(() => {
    return `try {
      let res = await ${getProviderCodeString(network)}.getBalance();
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [network]);

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
