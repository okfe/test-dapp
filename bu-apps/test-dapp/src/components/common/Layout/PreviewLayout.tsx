import PreviewBox from '@/components/common/PreviewBox';
import { Col, Row } from 'antd';
import React from 'react';

interface LayoutProps {
  previewData?: any;
  children: React.ReactNode;
}
const PreviewLayout: React.FC<LayoutProps> = (props) => {
  const { children, previewData } = props;

  return (
    <Row justify="space-between" gutter={[0, 32]}>
      <Col span={10} xs={24} sm={24} md={10} lg={10} xl={10}>
        {children}
      </Col>
      <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
        <PreviewBox value={previewData} />
      </Col>
    </Row>
  );
};

export default PreviewLayout;
