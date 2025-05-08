import { CopyTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/atom-one-dark.min.css';
import parserBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettier from 'prettier/standalone';
import { useEffect, useState } from 'react';
import styles from './CodeBox.less';
hljs.registerLanguage('typescript', typescript);

interface CodeBoxProps {
  language?: string;
  text?: string;
}

const CodeBox: React.FC<CodeBoxProps> = (props) => {
  const { language = 'typescript', text = '' } = props;
  const [code, setCode] = useState('');
  const [highlightCode, setHighlightCode] = useState('');

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
        setHighlightCode(
          hljs.highlight(result, {
            language,
          }).value,
        );
      } catch (error) {
        console.warn(error);
        setCode(JSON.stringify(error));
      }
    };

    formatCode();
  }, [text]);
  return (
    <div className={styles.relative}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlightCode }}></code>
      </pre>
      <div className={styles.copy}>
        <Typography.Text
          copyable={{ text: code, icon: <CopyTwoTone /> }}
        ></Typography.Text>
      </div>
    </div>
  );
};

export default CodeBox;
