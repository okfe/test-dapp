import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Col, Flex, Input, InputNumber, Row } from 'antd';
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

  const demo = useMemo(() => {
    return `try {
      const txid = await okxwallet.bitcoin.sendBitcoin(
        '${address ? address : 'tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz'}',
        ${value || 1000},
        {
          feeRate: ${feeRate || 0}
        }
      );
      console.log(txid);
    } catch (e) {
      console.log(e);
    }`;
  }, [address, value, feeRate]);

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Flex vertical gap="middle">
          <Flex>
            <Connector onError={onCallback} />
          </Flex>
          <Input
            value={address}
            onChange={onChangeAddress}
            placeholder="填写 address"
          />
          <InputNumber
            style={{ width: '100%' }}
            controls={false}
            placeholder="填写 value"
            onChange={onChangeValue}
            value={value}
          />
          <InputNumber
            style={{ width: '100%' }}
            controls={false}
            placeholder="填写 feeRate"
            onChange={onChangeFeeRate}
            value={feeRate}
          />
          <Flex>
            <APIButton
              apiName="sendBitcoin"
              onCallback={onCallback}
              params={curParams}
            />
          </Flex>
          <CodeBox text={demo} />
        </Flex>
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default SendBitcoinSmart;
