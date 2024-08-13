import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { analyzePsbt } from '@/utils/business/BTC/psbt/analyzePsbt';
import { Button, Col, Flex, Input, Row } from 'antd';
import React, { useState } from 'react';
import parsePsbt from '../../../utils/BTC/psbt/parsePsbt';
import styles from './index.less';

// 脚手架示例组件
const PSBTAnalyser: React.FC = () => {
  const [psbt, setPsbt] = useState('');

  const [previewData, setPreviewData] = useState({});

  const getPsbtData = () => {
    try {
      const PSBTInstance = parsePsbt(psbt);
      const visiblePsbt = analyzePsbt(PSBTInstance);
      setPreviewData(visiblePsbt);
    } catch (err) {
      setPreviewData({
        error: err.toString(),
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPsbt(e.target.value);
  };

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Flex gap="large" vertical>
          <Flex>
            <Connector />
          </Flex>
          <Flex gap="middle" vertical>
            <div className={styles.subTitle}>1. 输入PSBT (HEX)</div>
            <Input.TextArea rows={18} value={psbt} onChange={onChange} />
          </Flex>
          <Flex gap="middle" vertical>
            <div className={styles.subTitle}>2. 解析PSBT</div>
            <Button type="primary" onClick={getPsbtData}>
              解析
            </Button>
          </Flex>
        </Flex>
      </Col>
      <Col span={12}>
        <PreviewBox value={previewData} />
      </Col>
    </Row>
  );
};

export default PSBTAnalyser;
