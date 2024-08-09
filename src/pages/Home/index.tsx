import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        ☺️ Hi there. Welcome to OKX Wallet DApp Demo.
      </div>
    </PageContainer>
  );
};

export default HomePage;
