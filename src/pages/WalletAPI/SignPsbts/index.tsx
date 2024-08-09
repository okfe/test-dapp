import SignPsbtsSmart from '@/container/WalletAPI/signPsbts';
import { PageContainer } from '@ant-design/pro-components';

const SignPsbtsPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SignPsbtsSmart />
    </PageContainer>
  );
};

export default SignPsbtsPage;
