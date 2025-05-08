import SendInscriptionSmart from '@/container/WalletAPI/BTC/SendInscriptionSmart';
import { PageContainer } from '@ant-design/pro-components';

const SendInscriptionPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SendInscriptionSmart />
    </PageContainer>
  );
};

export default SendInscriptionPage;
