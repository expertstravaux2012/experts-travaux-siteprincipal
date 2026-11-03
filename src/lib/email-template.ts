import type { autoReply } from '../data/contact.ts';
import { site } from '../data/site.ts';
import { emailTheme as t } from './email-theme.ts';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const link = (href: string, label: string) =>
  `<a href="${escapeHtml(href)}" style="color:${t.color.text};text-decoration:underline;">${escapeHtml(label)}</a>`;

/** HTML de l'accusé de réception : mise en page en tableaux et styles en ligne (compatibilité clients mail). */
export function buildAutoReplyHtml(nom: string, reply: typeof autoReply): string {
  const body = `font-family:${t.font.body};font-size:16px;line-height:1.6;color:${t.color.textEditorial};`;
  const small = `font-family:${t.font.body};font-size:14px;line-height:1.6;color:${t.color.muted};`;
  const paragraphs = reply.body.map((line) => `<p style="margin:0 0 16px;${body}">${escapeHtml(line)}</p>`).join('');
  const socials = site.socials.map((s) => link(s.url, s.name)).join(' &nbsp;·&nbsp; ');

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(reply.subject)}</title></head>
<body style="margin:0;padding:0;background:${t.color.surface};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${t.color.surface};"><tr><td align="center" style="padding:24px 16px;">
<table role="presentation" width="${t.width}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${t.width}px;background:${t.color.card};border:1px solid ${t.color.hairline};">
<tr><td style="padding:32px 32px 24px;border-bottom:1px solid ${t.color.hairline};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="padding-right:12px;"><img src="${site.url}${site.logo.mark}" width="48" height="48" alt="" style="display:block;border:0;"></td>
<td style="font-family:${t.font.body};font-size:20px;font-weight:bold;color:${t.color.text};">${escapeHtml(site.name)}</td>
</tr></table></td></tr>
<tr><td style="padding:32px;">
<h1 style="margin:0 0 24px;font-family:${t.font.heading};font-size:28px;line-height:1.25;font-weight:normal;color:${t.color.text};">${escapeHtml(reply.subject)}</h1>
<p style="margin:0 0 16px;${body}">${escapeHtml(reply.greeting(nom))}</p>
${paragraphs}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr><td style="background:${t.color.button};">
<a href="${site.url}${reply.cta.href}" style="display:inline-block;padding:14px 24px;font-family:${t.font.body};font-size:14px;font-weight:bold;color:${t.color.onButton};text-decoration:none;">${escapeHtml(reply.cta.label)}</a>
</td></tr></table>
<p style="margin:0;${body}">${escapeHtml(reply.signature(site.name))}</p>
</td></tr>
<tr><td style="padding:24px 32px;background:${t.color.surface};border-top:1px solid ${t.color.hairline};${small}">
<p style="margin:0 0 8px;">${link(site.phone.href, site.phone.display)} &nbsp;·&nbsp; ${link(`mailto:${site.email}`, site.email)}</p>
<p style="margin:0 0 8px;">${escapeHtml(site.address.street)}, ${escapeHtml(site.address.city)}</p>
<p style="margin:0;">${escapeHtml(reply.socialsLabel)} : ${socials}</p>
</td></tr>
</table></td></tr></table></body></html>`;
}
