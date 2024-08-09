import SignPsbtsSmart from '@/container/WalletAPI/BTC/signPsbts';
import { PageContainer } from '@ant-design/pro-components';

const SignPsbtsPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SignPsbtsSmart />
    </PageContainer>
  );
};

export default SignPsbtsPage;
