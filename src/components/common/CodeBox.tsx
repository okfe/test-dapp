import useIsDarkMode from '@/hooks/useIsDarkMode';
import { CopyTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import parserBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettier from 'prettier/standalone';
import { useEffect, useState } from 'react';
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBox.less';

interface CodeBoxProps extends Partial<SyntaxHighlighterProps> {
  language?: string;
  text?: string;
}

const CodeBox: React.FC<CodeBoxProps> = (props) => {
  const { language = 'typescript', text = '' } = props;
  const [code, setCode] = useState('');

  const isDarkMode = useIsDarkMode();
  const codeStyle = isDarkMode ? oneDark : undefined;

  useEffect(() => {
    const formatCode = async () => {
      if (!text) {
        setCode('');
        return;
      }
      try {
        const result = await prettier.format(text, {
          parser: 'babel',
          plugins: [parserBabel, prettierPluginEstree],
        });
        setCode(result);
      } catch (error) {
        console.warn(error);
        setCode(JSON.stringify(error));
      }
    };

    formatCode();
  }, [text]);
  return (
    <div className={styles.relative}>
      <SyntaxHighlighter language={language} wrapLines={true} style={codeStyle}>
        {code}
      </SyntaxHighlighter>

      <div className={styles.copy}>
        <Typography.Text
          copyable={{ text: code, icon: <CopyTwoTone /> }}
        ></Typography.Text>
      </div>
    </div>
  );
};

export default CodeBox;
