// https://gist.github.com/stolinski/1fecfb2677e0b2deda9039608fecf5d8

import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    ro.observe(ref.current);
    return () => {
      ro.disconnect();
    };
  }, [ro]);
  return [{ ref }, bounds];
}

export { useMeasure };
