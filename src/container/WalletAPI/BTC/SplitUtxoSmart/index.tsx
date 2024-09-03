import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, Input, InputNumber } from 'antd';
import { Form } from 'antd/es';
import React, { useMemo, useState } from 'react';

const SplitUtxoSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [form] = Form.useForm();
  const allFormValue = Form.useWatch([], form);
  const onCallback = async (result: object) => {
    setResult(result);
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC_API_ALL],
  }));

  const curParams = useMemo(() => {
    return [allFormValue];
  }, [allFormValue]);

  const demo = useMemo(() => {
    return `try {
      const txid = await ${getProviderCodeString(network)}.splitUtxo(
        {
          from: '${allFormValue?.from || 'bc1pkrym02ck30phct287l0rktjjjnapavkl2qhsy78aeeeuk3qaaulqh90v6s'}',
          amount: ${allFormValue?.amount || 2},
        }
      );
      console.log(txid);
    } catch (e) {
      console.log(e);
    }`;
  }, [network, allFormValue]);

  return (
    <PreviewLayout previewData={result}>
      <Flex vertical gap="middle">
        <Flex>
          <Connector
            onError={onCallback}
            networkSwitch={NetworkSwitch.BTC_API_ALL}
          />
        </Flex>
        <Form form={form}>
          <Form.Item name="from" label="from" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="amount">
            <InputNumber controls={false} />
          </Form.Item>
        </Form>
        <Flex>
          <APIButton
            apiName="splitUtxo"
            onCallback={onCallback}
            params={curParams}
          />
        </Flex>
        <CodeBox text={demo} />
      </Flex>
    </PreviewLayout>
  );
};

export default SplitUtxoSmart;
