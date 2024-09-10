import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, InputNumber } from 'antd';
import React, { useMemo, useState } from 'react';

const GetInscriptionsSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [cursor, setCursor] = useState(undefined);
  const [size, setSize] = useState(undefined);

  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChangeCursor = (value: any) => {
    setCursor(value);
  };
  const onChangeSize = (feeRate: any) => {
    setSize(feeRate);
  };

  const curParams = useMemo(() => {
    return [cursor, size];
  }, [cursor, size]);

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC_API_ALL],
  }));

  const demo = useMemo(() => {
    return `try {
      const txid = await ${getProviderCodeString(network)}.getInscriptions(
        ${cursor || 0},
        ${size || 20},
      );
      console.log(txid);
    } catch (e) {
      console.log(e);
    }`;
  }, [network, cursor, size]);

  return (
    <PreviewLayout previewData={result}>
      <Flex vertical gap="middle">
        <Flex>
          <Connector
            onError={onCallback}
            networkSwitch={NetworkSwitch.BTC_API_ALL}
          />
        </Flex>
        <InputNumber
          style={{ width: '100%' }}
          controls={false}
          placeholder="填写 偏移量"
          onChange={onChangeCursor}
          value={cursor}
        />
        <InputNumber
          style={{ width: '100%' }}
          controls={false}
          placeholder="填写 数量"
          onChange={onChangeSize}
          value={size}
        />
        <Flex>
          <APIButton
            apiName="getInscriptions"
            onCallback={onCallback}
            params={curParams}
            networkSwitch={NetworkSwitch.BTC_API_ALL}
          />
        </Flex>
        <CodeBox text={demo} />
      </Flex>
    </PreviewLayout>
  );
};

export default GetInscriptionsSmart;
