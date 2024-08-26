import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        ☺️ Hi there. Welcome to Wallet OKXWallet Test Dapp.
      </div>
    </PageContainer>
  );
};

export default HomePage;
