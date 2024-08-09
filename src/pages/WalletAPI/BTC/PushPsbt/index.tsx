import PushPsbtSmart from '@/container/WalletAPI/BTC/pushPsbt';
import { PageContainer } from '@ant-design/pro-components';

const PushPsbtPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <PushPsbtSmart />
    </PageContainer>
  );
};

export default PushPsbtPage;
