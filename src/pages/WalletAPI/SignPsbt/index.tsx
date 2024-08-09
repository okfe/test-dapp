import SignPsbtSmart from '@/container/WalletAPI/signPsbt';
import { PageContainer } from '@ant-design/pro-components';

const SignPsbtPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SignPsbtSmart />
    </PageContainer>
  );
};

export default SignPsbtPage;
