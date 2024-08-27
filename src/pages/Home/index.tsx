import useIsDarkMode from '@/hooks/useIsDarkMode';
import { PageContainer } from '@ant-design/pro-components';
import {
  BitcoinCircleColorful,
  TonCircleColorful,
} from '@ant-design/web3-icons';
import { Link } from '@umijs/max';
import { Card, Col, Flex, Row, Typography } from 'antd';
import styles from './index.less';

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
            Seamlessly integrate the OKX Wallet with ease—designed for
            developers、 product managers and DApp creators.
          </Typography.Title>
        </Flex>
        <Row justify="space-around" style={{ marginTop: 44 }} gutter={[0, 32]}>
          <Col span={7} xs={24} sm={24} md={7} lg={7} xl={7}>
            <Link to="./psbt/builder">
              <Card
                title="PSBT Tools"
                bordered={false}
                hoverable
                extra={<BitcoinCircleColorful className={styles.icon} />}
                style={{ height: '100%' }}
              >
                Build psbt, sign psbt, extract transaction and broadcast it.
              </Card>
            </Link>
          </Col>
          <Col span={7} xs={24} sm={24} md={7} lg={7} xl={7}>
            <Link to="./wallet-btc-api/connect">
              <Card
                title="Wallet BTC API"
                bordered={false}
                hoverable
                extra={<BitcoinCircleColorful className={styles.icon} />}
                style={{ height: '100%' }}
              >
                Support mainnet, testnet and signet.
                <br />
                And support fractal mainnet soon.
              </Card>
            </Link>
          </Col>
          <Col span={7} xs={24} sm={24} md={7} lg={7} xl={7}>
            <Link to="./wallet-ton-api/connect">
              <Card
                title="Wallet TON API"
                bordered={false}
                hoverable
                extra={<TonCircleColorful className={styles.icon} />}
                style={{ height: '100%' }}
              >
                Support TON with OKXWallet and TONConnect.
              </Card>
            </Link>
          </Col>
        </Row>
      </Flex>
    </PageContainer>
  );
};

export default HomePage;
