import InscribeSmart from '@/container/WalletAPI/BTC/InscribeSmart';
import { PageContainer } from '@ant-design/pro-components';

const InscribePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <InscribeSmart />
    </PageContainer>
  );
};

export default InscribePage;
