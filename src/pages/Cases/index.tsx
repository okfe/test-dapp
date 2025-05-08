import CasesSmart from '@/container/CasesSmart/index';
import { PageContainer } from '@ant-design/pro-components';

const CasesPage: React.FC = () => {
  return (
    <PageContainer ghost header={{ title: null }}>
      <CasesSmart />
    </PageContainer>
  );
};

export default CasesPage;
