import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import {
  getProviderCodeString,
  Network,
  NetworkSwitch,
} from '@/constants/network';
import { manifestUrl } from '@/constants/Ton';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Flex, Form, Input, Space } from 'antd';
import { useMemo, useState } from 'react';

export default function SendSmart() {
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const allFormValue = Form.useWatch([], form);
  console.log(allFormValue);

  const { network } = useModel('NetworkModel', (model) => ({
    network: model.networks[Network.TON],
  }));

  // seven days
  const validUntil = Math.floor(Date.now() / 1000) + 604800;

  const onCallback = (result: object) => {
    setData(result);
  };

  const apiParams = useMemo(() => {
    return {
      method: 'sendTransaction',
      params: [
        {
          valid_until: validUntil,
          network: '-239',
          from: network?.address,
          messages: allFormValue?.messages,
        },
      ],
      id: 1,
    };
  }, [allFormValue, network, validUntil]);

  const demo = useMemo(() => {
    return `
    try {
      let res = await ${getProviderCodeString(Network.TON)}.tonconnect.send(${JSON.stringify(apiParams)});
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [apiParams]);

  return (
    <PreviewLayout previewData={data}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Connector
          networkSwitch={NetworkSwitch.TON}
          onError={onCallback}
          params={[2, { manifestUrl, items: [{ name: 'ton_addr' }] }]}
        />
        <Form form={form} name="dynamic_form" autoComplete="off">
          <Form.List name="messages">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Flex key={key} gap="small" align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'address']}
                      rules={[{ required: true, message: 'Missing address' }]}
                    >
                      <Input placeholder="address" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'amount']}
                      rules={[{ required: true, message: 'Missing amount' }]}
                    >
                      <Input placeholder="amount" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'payload']}
                      rules={[{ message: 'Missing payload' }]}
                    >
                      <Input placeholder="payload (option)" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'stateInit']}
                      rules={[{ message: 'Missing stateInit' }]}
                    >
                      <Input placeholder="stateInit (option)" />
                    </Form.Item>

                    <MinusCircleTwoTone onClick={() => remove(name)} />
                  </Flex>
                ))}
                <Form.Item>
                  <Button
                    onClick={() => add()}
                    block
                    icon={<PlusCircleTwoTone />}
                  >
                    Add Params
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
        <APIButton
          apiName="send"
          networkSwitch={NetworkSwitch.TON}
          onCallback={onCallback}
          params={[apiParams]}
        />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
}
