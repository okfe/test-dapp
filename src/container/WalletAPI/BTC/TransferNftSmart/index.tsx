import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, Input } from 'antd';
import { Button, Form } from 'antd/es';
import React, { useMemo, useState } from 'react';

const TransferNftSmart: React.FC = () => {
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
      const txid = await ${getProviderCodeString(network)}.transferNft(
        {
          from: '${allFormValue?.from || 'bc1p8qfrmxdlmynr076uu28vlszxavwujwe7dus0r8y9thrnp5lgfh6qu2ctrr'}',
          to: '${allFormValue?.to || 'bc1p8qfrmxdlmynr076uu28vlszxavwujwe7dus0r8y9thrnp5lgfh6qu2ctrr'}',
          data: ${
            allFormValue?.data?.length > 0
              ? JSON.stringify(allFormValue?.data)
              : JSON.stringify([
                  '2f285ba4c457c98c35dcb008114b96cee7c957f00a6993690efb231f91ccc2d9i0-Ordinals',
                  '2f2532f59d6e46931bc84e496cc6b45f87966b149b85ed3199265cb845550d58i0-Ordinals',
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
          <Form.Item name="from" label="from" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="to" label="to" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.List name="data">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Input data" />
                    </Form.Item>
                    <Button type="link" onClick={() => remove(name)}>
                      Delete
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add data
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
        <Flex>
          <APIButton
            apiName="transferNft"
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

export default TransferNftSmart;
