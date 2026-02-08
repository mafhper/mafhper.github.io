import { useState, useEffect } from 'react';

export function useFirstPaintGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Falls back to setTimeout if requestIdleCallback is not supported
    const win = window as unknown as {
      requestIdleCallback: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback: (id: number) => void;
      setTimeout: typeof setTimeout;
      clearTimeout: typeof clearTimeout;
    };

    const id = win.requestIdleCallback
      ? win.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      : win.setTimeout(() => setReady(true), 500);

    return () => {
      if (win.cancelIdleCallback) {
        win.cancelIdleCallback(id);
      } else {
        win.clearTimeout(id);
      }
    };
  }, []);

  return ready;
}
