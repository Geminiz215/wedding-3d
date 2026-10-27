'use client';

import { useEffect, useState } from 'react';

export interface ModelDownload {
  url: string | null; // blob: URL handed to useGLTF once the bytes are in
  progress: number | null; // 0..100, null when the server sends no Content-Length
  error: boolean;
}

/** Downloads the GLB with real byte progress (THREE's LoadingManager only counts whole files). */
export function useModelDownload(src: string, enabled: boolean): ModelDownload {
  const [state, setState] = useState<ModelDownload>({ url: null, progress: 0, error: false });

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let objectUrl: string | null = null;

    (async () => {
      const res = await fetch(src, { signal: controller.signal });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const total = Number(res.headers.get('content-length')) || 0;
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        setState((s) => ({ ...s, progress: total ? Math.min(99, (received / total) * 100) : null }));
      }
      objectUrl = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: 'model/gltf-binary' }));
      setState({ url: objectUrl, progress: 100, error: false });
    })().catch((err) => {
      if (!controller.signal.aborted) {
        console.error('Model download failed:', err);
        setState({ url: null, progress: null, error: true });
      }
    });

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, enabled]);

  return state;
}
