import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-cold';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';

SyntaxHighlighter.registerLanguage('jsx', jsx);

interface Props {
  children: string;
  language?: string;
}

function CommonHighlighter({ children, language = 'jsx' }: Props) {
  return (
    <SyntaxHighlighter language={language} style={prism} customStyle={{ padding: 20, margin: 0 }}>
      {children}
    </SyntaxHighlighter>
  );
}

export default CommonHighlighter;
