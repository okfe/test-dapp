import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, Input, InputNumber } from 'antd';
import React, { useMemo, useState } from 'react';

const SendBitcoinSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [address, setAddress] = useState('');
  const [value, setValue] = useState(undefined);
  const [feeRate, setFeeRate] = useState(undefined);

  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const onChangeValue = (value: any) => {
    setValue(value);
  };
  const onChangeFeeRate = (feeRate: any) => {
    setFeeRate(feeRate);
  };

  const curParams = useMemo(() => {
    if (feeRate) {
      return [address, value, { feeRate }];
    } else {
      return [address, value];
    }
  }, [address, value, feeRate]);

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    return `try {
      const txid = await ${getProviderCodeString(network)}.sendBitcoin(
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
  }, [network, address, value, feeRate]);

  return (
    <PreviewLayout previewData={result}>
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
    </PreviewLayout>
  );
};

export default SendBitcoinSmart;
