import GetBalanceSmart from '@/container/WalletAPI/BTC/getBalance';
import { PageContainer } from '@ant-design/pro-components';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <GetBalanceSmart />
    </PageContainer>
  );
};

export default ConnectPage;
