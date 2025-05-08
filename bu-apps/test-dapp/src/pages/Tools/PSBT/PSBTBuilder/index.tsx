import PsbtBuilder from '@/container/PSBT/PSBTBuilder';
import { PageContainer } from '@ant-design/pro-components';

const PSBTPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <PsbtBuilder />
    </PageContainer>
  );
};

export default PSBTPage;
