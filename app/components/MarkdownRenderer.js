import React from 'react';
import { addUtmParams } from '../utils/utm';
import { ExternalLink } from 'lucide-react';

/**
 * Custom lightweight Markdown Renderer component.
 * Converts markdown text into stylized HTML components.
 */
export default function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null;

  // Split into lines for parsing blocks
  const lines = content.split('\n');
  const blocks = [];
  let currentList = [];
  let inCodeBlock = false;
  let codeBlockLines = [];
  let codeLang = '';

  const processInline = (text) => {
    if (!text) return null;

    // Pattern for inline code, bold, italic, and links
    const parts = [];
    let key = 0;

    // Split by Markdown links [text](url), bold **text**, code `code`, italic *text*
    const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|_[^_]+_)/g;
    const tokens = text.split(regex);

    tokens.forEach((token) => {
      if (!token) return;

      if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, linkText, rawUrl] = linkMatch;
          const isExternal = rawUrl.startsWith('http://') || rawUrl.startsWith('https://');
          const finalUrl = isExternal ? addUtmParams(rawUrl, { utm_content: 'markdown_link' }) : rawUrl;

          parts.push(
            <a
              key={key++}
              href={finalUrl}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-[var(--matrix-green)] hover:text-[var(--cyber-blue)] underline underline-offset-4 inline-flex items-center gap-1 font-semibold transition-colors"
            >
              <span>{linkText}</span>
              {isExternal && <ExternalLink size={12} className="inline shrink-0" />}
            </a>
          );
          return;
        }
      }

      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={key++} className="font-bold text-foreground font-mono">
            {token.slice(2, -2)}
          </strong>
        );
        return;
      }

      if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={key++}
            className="bg-white/10 text-[var(--matrix-green)] font-mono text-xs px-1.5 py-0.5 rounded border border-white/10"
          >
            {token.slice(1, -1)}
          </code>
        );
        return;
      }

      if ((token.startsWith('*') && token.endsWith('*')) || (token.startsWith('_') && token.endsWith('_'))) {
        parts.push(
          <em key={key++} className="italic text-foreground/90 font-serif">
            {token.slice(1, -1)}
          </em>
        );
        return;
      }

      parts.push(token);
    });

    return parts;
  };

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push(
        <ul key={`list-${blocks.length}`} className="list-disc list-inside space-y-1.5 my-3 pl-2 text-foreground/80 font-sans text-sm">
          {currentList.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="text-[var(--matrix-green)] mr-1">•</span>
              {processInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code blocks ```
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        blocks.push(
          <div key={`code-${blocks.length}`} className="my-4 rounded-lg bg-[#050505] border border-white/10 p-4 font-mono text-xs overflow-x-auto relative">
            {codeLang && (
              <span className="absolute top-2 right-3 text-[10px] text-foreground/40 uppercase font-mono tracking-widest">
                {codeLang}
              </span>
            )}
            <pre className="text-[var(--matrix-green)] leading-relaxed">
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockLines = [];
        codeLang = '';
      } else {
        flushList();
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Headers #, ##, ###
    if (line.startsWith('# ')) {
      flushList();
      blocks.push(
        <h1 key={`h1-${blocks.length}`} className="text-2xl font-bold font-mono text-foreground mt-6 mb-3 border-b border-white/10 pb-2">
          {processInline(line.slice(2))}
        </h1>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="text-xl font-bold font-mono text-[var(--matrix-green)] mt-5 mb-2">
          {processInline(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      flushList();
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="text-lg font-bold font-mono text-[var(--cyber-blue)] mt-4 mb-2">
          {processInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    // Bullet lists - or *
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      currentList.push(line.trim().slice(2));
      continue;
    }

    // Blockquotes >
    if (line.startsWith('> ')) {
      flushList();
      blocks.push(
        <blockquote key={`bq-${blocks.length}`} className="border-l-4 border-[var(--matrix-green)] pl-4 py-2 my-3 bg-white/[0.02] rounded-r text-foreground/80 italic font-mono text-sm">
          {processInline(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      flushList();
      continue;
    }

    // Paragraph
    flushList();
    blocks.push(
      <p key={`p-${blocks.length}`} className="my-2 leading-relaxed text-foreground/80 text-sm font-sans">
        {processInline(line)}
      </p>
    );
  }

  flushList();

  return <div className={`markdown-body space-y-2 ${className}`}>{blocks}</div>;
}
