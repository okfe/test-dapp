import SignPsbtSmart from '@/container/WalletAPI/BTC/signPsbt';
import { PageContainer } from '@ant-design/pro-components';

const SignPsbtPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SignPsbtSmart />
    </PageContainer>
  );
};

export default SignPsbtPage;
