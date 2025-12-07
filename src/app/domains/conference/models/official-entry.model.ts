export type IssueReason =
  | 'produto-danificado'
  | 'destinatario-ausente'
  | 'endereco-incorreto'
  | 'nao-classificado';

export interface OfficialEntry {
  id: string;
  issue: IssueReason;
}

export const ISSUE_REASON_LABELS: Record<IssueReason, string> = {
  'produto-danificado': 'Produto danificado',
  'destinatario-ausente': 'Destinatário ausente',
  'endereco-incorreto': 'Endereço incorreto',
  'nao-classificado': 'Não classificado'
};

export const ISSUE_REASON_ORDER: IssueReason[] = [
  'produto-danificado',
  'destinatario-ausente',
  'endereco-incorreto',
  'nao-classificado'
];

// Normaliza textos vindos do Excel para as chaves internas utilizadas na aplicação.
const ISSUE_REASON_LOOKUP: Record<string, IssueReason> = {
  'produto danificado': 'produto-danificado',
  'destinatario ausente': 'destinatario-ausente',
  'destinatário ausente': 'destinatario-ausente',
  'endereco incorreto': 'endereco-incorreto',
  'endereço incorreto': 'endereco-incorreto'
};

export const DEFAULT_ISSUE_REASON: IssueReason = 'nao-classificado';

export function normalizeIssueReason(value: unknown): IssueReason {
  if (value == null) {
    return DEFAULT_ISSUE_REASON;
  }

  const normalized = String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/\s+/g, ' ');

  return ISSUE_REASON_LOOKUP[normalized] ?? DEFAULT_ISSUE_REASON;
}
