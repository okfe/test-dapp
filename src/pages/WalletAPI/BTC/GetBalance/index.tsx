import GetBalanceSmart from '@/container/WalletAPI/BTC/GetBalanceSmart';
import { PageContainer } from '@ant-design/pro-components';

const GetBalancePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <GetBalanceSmart />
    </PageContainer>
  );
};

export default GetBalancePage;
