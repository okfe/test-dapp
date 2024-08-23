import { Typography } from 'antd';
import { Card, Space } from 'antd-mobile';

function BlackAddress({ address }) {
  if (!address) {
    return null;
  }

  return (
    <Card title="Black Address">
      <Space direction="vertical">
        <Typography.Text copyable>{address}</Typography.Text>
      </Space>
    </Card>
  );
}

export default BlackAddress;
