export interface FileChangeMock {
  event: Event;
  input: HTMLInputElement;
  file?: File;
}

interface FileChangeOptions {
  fileName?: string;
  content?: string;
  mimeType?: string;
}

/**
 * Cria um evento simulado de mudança em `<input type="file">`.
 * Permite testar fluxos de upload sem depender do DOM real.
 */
export function createFileChangeMock(options: FileChangeOptions = {}): FileChangeMock {
  const { fileName, content = 'conteúdo de teste', mimeType = 'text/plain' } = options;

  const file = fileName ? new File([content], fileName, { type: mimeType }) : undefined;

  const files = {
    length: file ? 1 : 0,
    item: (index: number) => {
      if (!file || index !== 0) {
        return null;
      }
      return file;
    }
  } as FileList;

  if (file) {
    (files as unknown as Record<number, File>)[0] = file;
  }

  const input = { files, value: 'fake-path' } as HTMLInputElement;
  const event = { target: input } as unknown as Event;

  return { event, input, file };
}
