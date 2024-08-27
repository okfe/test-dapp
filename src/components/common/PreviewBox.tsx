import useIsDarkMode from '@/hooks/useIsDarkMode';
import { Typography } from 'antd';
import { useCallback } from 'react';
import type { OnCopyProps } from 'react-json-view';
import JsonView from 'react-json-view';
interface PreviewBoxProps {
  value: any;
  title?: string;
}

const PreviewBox: React.FC<PreviewBoxProps> = (props) => {
  const { title = '', value } = props;
  const isDarkMode = useIsDarkMode();

  const onCopy = useCallback((copy: OnCopyProps) => {
    const copyText = copy.src;
    if (typeof copyText === 'string') {
      window.navigator.clipboard.writeText(copyText);
    }
  }, []);

  return (
    <>
      <Typography.Title level={4}>{title || 'Preview Zone'}</Typography.Title>
      <JsonView
        // summerfruit, pop, bright, codeschool with bg
        theme={isDarkMode ? 'pop' : 'rjv-default'}
        style={{
          wordBreak: 'break-all',
        }}
        src={value}
        quotesOnKeys={false}
        displayDataTypes={false}
        collapseStringsAfterLength={20}
        enableClipboard={onCopy}
        // style={monokaiTheme}
      />
    </>
  );
};

export default PreviewBox;
