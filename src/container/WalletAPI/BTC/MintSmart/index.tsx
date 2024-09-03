import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, Input, InputNumber } from 'antd';
import { Button, Form } from 'antd/es';
import React, { useMemo, useState } from 'react';

const MintSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [form] = Form.useForm();
  const allFormValue = Form.useWatch([], form);
  const onCallback = async (result: object) => {
    console.log(allFormValue);
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
      const txid = await ${getProviderCodeString(network)}.mint(
        {
          type: ${allFormValue?.type || 61},
          from: '${allFormValue?.from || 'bc1p4k9ghlrynzuum080a4zk6e2my8kjzfhptr5747afzrn7xmmdtj6sgrhd0m'}',
          inscriptions: ${
            allFormValue?.inscriptions?.length > 0
              ? JSON.stringify(allFormValue?.inscriptions)
              : JSON.stringify([
                  {
                    contentType: 'text/plain;charset=utf-8',
                    body: 'hello',
                  },
                  {
                    contentType: 'text/plain;charset=utf-8',
                    body: 'world',
                  },
                ])
          },
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
          <Form.Item name="type" label="type" rules={[{ required: true }]}>
            <InputNumber controls={false} />
          </Form.Item>
          <Form.Item name="from" label="from" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.List name="inscriptions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'contentType']}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Input value" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'body']}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Input body" />
                    </Form.Item>
                    <Button type="link" onClick={() => remove(name)}>
                      Delete
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add inscriptions
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
        <Flex>
          <APIButton
            apiName="mint"
            onCallback={onCallback}
            params={curParams}
          />
        </Flex>
        <CodeBox text={demo} />
      </Flex>
    </PreviewLayout>
  );
};

export default MintSmart;
