import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';

import { Col, Input, Row, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const PushPsbtSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [signedPsbt, setSignedPsbt] = useState('');

  const onCallback = async (result: object) => {
    setResult(result);
  };
  const onChange = (e) => {
    setSignedPsbt(e.target.value);
  };

  const demo = useMemo(() => {
    return `try {
        let res = await okxwallet.bitcoin.pushPsbt('${signedPsbt ? signedPsbt : '70736274ff01007d...'}');
          console.log(res);
        } catch (e) {
          console.log(e);
        }`;
  }, [signedPsbt]);

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Connector onError={onCallback} />
          <Input
            value={signedPsbt}
            onChange={onChange}
            placeholder="填写 PSBT"
          />
          <APIButton
            apiName="pushPsbt"
            onCallback={onCallback}
            params={[signedPsbt]}
          />
          <CodeBox text={demo} />
        </Space>
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default PushPsbtSmart;
