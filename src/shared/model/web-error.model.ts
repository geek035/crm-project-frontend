export interface WebErrorModel {
  title: string;
  messages: string[];
  status: number;
}

export function isWebErrorModel(error: unknown): error is WebErrorModel {
  return (
    !!error &&
    typeof error === 'object' &&
    'messages' in error &&
    Array.isArray((error as { messages?: unknown }).messages)
  );
}
