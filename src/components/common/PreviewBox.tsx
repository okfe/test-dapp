import { Typography } from 'antd';
import JsonView from 'react-json-view';

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
        style={{
          wordBreak: 'break-all',
        }}
        src={value}
        displayDataTypes={false}
        collapseStringsAfterLength={20}
        // style={monokaiTheme}
      />
    </>
  );
};

export default PreviewBox;
