import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Flex, Input, InputNumber, Select } from 'antd';
import { Form } from 'antd/es';
import React, { useEffect, useMemo, useState } from 'react';

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
  const { networkModel = {} } = useModel('NetworkModel', (model) => ({
    networkModel: model.networks[network],
  }));
  console.log(networkModel);

  useEffect(() => {
    form.setFieldsValue({
      from: networkModel.address,
    });
  }, [form, networkModel.address]);

  const curParams = useMemo(() => {
    const curInscriptions = new Array(
      allFormValue?.inscription?.repeat || 0,
    ).fill({
      contentType: allFormValue?.inscription?.contentType,
      body: allFormValue?.inscription?.body,
    });
    const curParam = {
      type: allFormValue?.type,
      from: allFormValue?.from,
      inscriptions: curInscriptions,
      noBroadCast: allFormValue?.noBroadCast,
    };
    console.log(curParam);
    return [curParam];
  }, [allFormValue]);

  const demo = useMemo(() => {
    return `try {
      const txid = await ${getProviderCodeString(network)}.mint(
        {
          type: ${allFormValue?.type || 61},
          from: '${allFormValue?.from}',
          noBroadCast: ${allFormValue?.noBroadCast || false},
          inscriptions: ${
            curParams[0].inscriptions?.length > 0
              ? JSON.stringify(curParams[0].inscriptions)
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
          }
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
        <Form
          form={form}
          initialValues={{
            type: 61,
            inscription: {
              contentType: 'text/plain;charset=utf-8',
            },
            noBroadCast: false,
          }}
          labelCol={{ span: 5, sm: 4, md: 7 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            name="type"
            label="type"
            rules={[{ required: true }]}
            labelAlign="left"
          >
            <Select
              options={[
                { value: 60, label: '60 BRC-20 deploy 铭刻' },
                { value: 50, label: '50 BRC-20 mint 铭刻' },
                { value: 51, label: '51 BRC-20 transfer 铭刻' },
                {
                  value: 62,
                  label:
                    '62 图片铭刻，需要将图片转换为图片字节流的 16 进制字符串表示',
                },
                { value: 61, label: '61 纯文本' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="from"
            label="from"
            rules={[{ required: true }]}
            labelAlign="left"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="noBroadCast" label="noBroadCast" labelAlign="left">
            <Select
              options={[
                { value: false, label: 'false' },
                { value: true, label: 'true' },
              ]}
            />
          </Form.Item>
          <Form.Item name="inscription" label="inscription" labelAlign="left">
            <Form.Item
              name={['inscription', 'contentType']}
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: 'image/png', label: 'image/png' },
                  { value: 'image/jpeg', label: 'image/jpeg' },
                  {
                    value: 'text/plain;charset=utf-8',
                    label: 'text/plain;charset=utf-8',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name={['inscription', 'body']}
              rules={[{ required: true }]}
            >
              <Input placeholder="Input body" />
            </Form.Item>
            <Form.Item
              name={['inscription', 'repeat']}
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="Repeat times [1,1500]"
                style={{ width: '100%' }}
                min={1}
                max={1500}
              />
            </Form.Item>
          </Form.Item>
        </Form>
        <Flex>
          <APIButton
            apiName="mint"
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

export default MintSmart;
