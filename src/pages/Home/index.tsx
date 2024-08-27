import useIsDarkMode from '@/hooks/useIsDarkMode';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Flex, Row, Typography } from 'antd';

const HomePage: React.FC = () => {
  const isDarkMode = useIsDarkMode();

  return (
    <PageContainer ghost>
      <Flex gap="large" vertical>
        <Flex vertical align="center">
          <Typography.Title
            level={1}
            style={{ color: isDarkMode ? 'rgb(188, 255, 47)' : '' }}
          >
            OKXWallet Test DApp
          </Typography.Title>
          <Typography.Title level={5}>
            Help developers, product manager, DApp to test OKXWallet API easily.
          </Typography.Title>
        </Flex>
        <Row justify="space-around" style={{ marginTop: 44 }} gutter={[0, 32]}>
          <Col span={7} xs={24} sm={24} md={7} lg={7} xl={7}>
            <a href="./psbt/builder">
              <Card
                title="PSBT Tools"
                bordered={false}
                hoverable
                style={{ height: '100%' }}
              >
                Build psbt, sign psbt, extract transaction and broadcast it.
              </Card>
            </a>
          </Col>
          <Col span={7} xs={24} sm={24} md={7} lg={7} xl={7}>
            <a href="./wallet-btc-api/connect">
              <Card
                title="Wallet BTC API"
                bordered={false}
                hoverable
                style={{ height: '100%' }}
              >
                Support mainnet, testnet and signet.
                <br />
                And support fractal mainnet soon.
              </Card>
            </a>
          </Col>
          <Col span={7} xs={24} sm={24} md={7} lg={7} xl={7}>
            <a href="./wallet-ton-api/connect">
              <Card
                title="Wallet TON API"
                bordered={false}
                hoverable
                style={{ height: '100%' }}
              >
                Support TON with OKXWallet and TONConnect.
              </Card>
            </a>
          </Col>
        </Row>
      </Flex>
    </PageContainer>
  );
};

export default HomePage;
