import APIButton from '@/components/common/APIButton';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Input, InputNumber, Row, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const SendBitcoinSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [address, setAddress] = useState('');
  const [value, setValue] = useState(undefined);
  const [feeRate, setFeeRate] = useState(undefined);

  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeValue = (value) => {
    setValue(value);
  };
  const onChangeFeeRate = (feeRate) => {
    setFeeRate(feeRate);
  };

  const curParams = useMemo(() => {
    if (feeRate) {
      return [address, value, { feeRate }];
    } else {
      return [address, value];
    }
  }, [address, value, feeRate]);

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Connector onError={onCallback} />
          </Row>
          <Input
            value={address}
            onChange={onChangeAddress}
            placeholder="填写address"
          />
          <InputNumber
            controls={false}
            placeholder="填写Value"
            onChange={onChangeValue}
            value={value}
          />
          <InputNumber
            controls={false}
            placeholder="填写FeeRate"
            onChange={onChangeFeeRate}
            value={feeRate}
          />
          <APIButton
            apiName="sendBitcoin"
            onCallback={onCallback}
            params={curParams}
          />
        </Space>
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default SendBitcoinSmart;
