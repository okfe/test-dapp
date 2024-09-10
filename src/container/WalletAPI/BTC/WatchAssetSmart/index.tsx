import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, Input } from 'antd';
import { Form } from 'antd/es';
import React, { useMemo, useState } from 'react';

const WatchAssetSmart: React.FC = () => {
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
      const txid = await ${getProviderCodeString(network)}.watchAsset(
        {
          name: '${allFormValue?.name || 'ordi'}',
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
          <Form.Item name="name" label="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
        <Flex>
          <APIButton
            apiName="watchAsset"
            onCallback={onCallback}
            params={curParams}
          />
        </Flex>
        <CodeBox text={demo} />
      </Flex>
    </PreviewLayout>
  );
};

export default WatchAssetSmart;
