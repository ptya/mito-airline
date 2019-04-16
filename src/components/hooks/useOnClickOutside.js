// based on https://usehooks.com/useOnClickOutside/
import { useEffect } from "react";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    // add listeners
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);
}

export { useOnClickOutside };
