import parserBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettier from 'prettier/standalone';
import { useEffect, useState } from 'react';
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';

interface CodeBoxProps extends SyntaxHighlighterProps {
  language?: string;
  text?: string;
  children?: any;
}

const CodeBox: React.FC<CodeBoxProps> = (props) => {
  const { language = 'typescript', text = '' } = props;
  const [code, setCode] = useState('');
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
    <SyntaxHighlighter language={language} wrapLines={true}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBox;
