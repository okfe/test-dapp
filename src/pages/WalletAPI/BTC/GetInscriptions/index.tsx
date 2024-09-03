import GetInscriptionsSmart from '@/container/WalletAPI/BTC/GetInscriptionsSmart';
import { PageContainer } from '@ant-design/pro-components';

const GetInscriptionsPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <GetInscriptionsSmart />
    </PageContainer>
  );
};

export default GetInscriptionsPage;
