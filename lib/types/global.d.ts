declare global {
  interface Window {
    getEditorContent?: () => string;
  }
}

export {};
