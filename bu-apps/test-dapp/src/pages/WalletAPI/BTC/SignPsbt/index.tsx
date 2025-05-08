import SignPsbtSmart from '@/container/WalletAPI/BTC/SignPsbtSmart';
import { PageContainer } from '@ant-design/pro-components';

const SignPsbtPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SignPsbtSmart />
    </PageContainer>
  );
};

export default SignPsbtPage;
