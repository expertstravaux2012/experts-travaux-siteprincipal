// Construction du fichier /llms.txt (spécification https://llmstxt.org) : fonction pure, sans dépendance aux données.
// Format : H1 (nom), blockquote (résumé), paragraphes de détail, puis sections H2 de liens.
// Une section intitulée « Optional » signale aux agents les liens secondaires, qu'ils peuvent ignorer.

export interface LlmsLink {
  label: string;
  /** URL absolue. */
  url: string;
  description?: string;
}

export interface LlmsSection {
  title: string;
  links: LlmsLink[];
}

export interface LlmsDocument {
  name: string;
  summary: string;
  details: string[];
  sections: LlmsSection[];
}

const linkLine = ({ label, url, description }: LlmsLink): string =>
  `- [${label}](${url})${description ? `: ${description}` : ''}`;

export const buildLlmsTxt = ({ name, summary, details, sections }: LlmsDocument): string => {
  const blocks = [
    `# ${name}`,
    `> ${summary}`,
    ...details,
    ...sections
      .filter(({ links }) => links.length > 0)
      .map(({ title, links }) => [`## ${title}`, ...links.map(linkLine)].join('\n')),
  ];
  return `${blocks.join('\n\n')}\n`;
};
