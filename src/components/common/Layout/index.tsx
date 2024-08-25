import PreviewBox from '@/components/common/PreviewBox';
import { Col, Row } from 'antd';
import React from 'react';

interface LayoutProps {
  previewData?: any;
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = (props) => {
  const { children, previewData } = props;

  return (
    <Row justify="space-between">
      <Col span={10}>{children}</Col>
      <Col span={12}>
        <PreviewBox value={previewData} />
      </Col>
    </Row>
  );
};

export default Layout;
