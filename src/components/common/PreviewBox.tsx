import JsonView from '@uiw/react-json-view';
import { Typography } from 'antd';

// import { monokaiTheme } from '@uiw/react-json-view/monokai';
interface PreviewBoxProps {
  value: any;
  title?: string;
}

const PreviewBox: React.FC<PreviewBoxProps> = (props) => {
  const { title = '', value } = props;
  return (
    <>
      <Typography.Title level={4}>{title || '预览区'}</Typography.Title>
      <JsonView
        value={value}
        displayDataTypes={false}
        shortenTextAfterLength={80}
        // style={monokaiTheme}
      />
    </>
  );
};

export default PreviewBox;
