import PSBTAnalyser from '@/container/PSBT/PSBTAnalyser';
import { PageContainer } from '@ant-design/pro-components';

const PSBTPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <PSBTAnalyser />
    </PageContainer>
  );
};

export default PSBTPage;
