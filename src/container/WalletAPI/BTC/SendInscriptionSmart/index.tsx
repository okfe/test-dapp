import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, Input, InputNumber } from 'antd';
import React, { useMemo, useState } from 'react';

const SendInscriptionSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [address, setAddress] = useState('');
  const [inscriptionId, setInscriptionId] = useState('');
  const [feeRate, setFeeRate] = useState(undefined);

  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const onChangeInscriptionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInscriptionId(e.target.value);
  };
  const onChangeFeeRate = (feeRate: any) => {
    setFeeRate(feeRate);
  };

  const curParams = useMemo(() => {
    if (feeRate) {
      return [address, inscriptionId, { feeRate }];
    } else {
      return [address, inscriptionId];
    }
  }, [address, inscriptionId, feeRate]);

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC_API_ALL],
  }));

  const demo = useMemo(() => {
    return `try {
      const txid = await ${getProviderCodeString(network)}.sendInscription(
        '${address ? address : 'tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny'}',
        '${inscriptionId ? inscriptionId : 'e9b86a063d78cc8a1ed17d291703bcc95bcd521e087ab0c7f1621c9c607def1ai0'}',
        {
          feeRate: ${feeRate || 15}
        }
      );
      console.log(txid);
    } catch (e) {
      console.log(e);
    }`;
  }, [network, address, inscriptionId, feeRate]);

  return (
    <PreviewLayout previewData={result}>
      <Flex vertical gap="middle">
        <Flex>
          <Connector
            onError={onCallback}
            networkSwitch={NetworkSwitch.BTC_API_ALL}
          />
        </Flex>
        <Input
          value={address}
          onChange={onChangeAddress}
          placeholder="填写 address"
        />
        <Input
          value={inscriptionId}
          onChange={onChangeInscriptionId}
          placeholder="填写 InscriptionId"
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
            apiName="sendInscription"
            onCallback={onCallback}
            params={curParams}
          />
        </Flex>
        <CodeBox text={demo} />
      </Flex>
    </PreviewLayout>
  );
};

export default SendInscriptionSmart;
