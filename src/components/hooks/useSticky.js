import { useEffect, useState } from "react";

function useSticky(scroll) {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const listener = event => {
      if (event.target.scrollingElement.scrollTop >= scroll && !isSticky) {
        setIsSticky(true);
      }
      if (event.target.scrollingElement.scrollTop < scroll && isSticky) {
        setIsSticky(false);
      }
    };

    // add listeners
    window.addEventListener("scroll", listener);

    // cleanup on unmount
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [isSticky, scroll]);

  return isSticky;
}

export { useSticky };
