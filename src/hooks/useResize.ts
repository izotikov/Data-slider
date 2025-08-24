import { useEffect, useState } from "react";

type TResize = {
  isMobile: boolean;
};

const getResize = (): TResize => {
  return {
    isMobile: document.documentElement.clientWidth < 768,
  };
};

export default function useResize() {
  const [resize, setResize] = useState<TResize>(getResize);

  useEffect(() => {
    const checkWidth = () => {
      setResize(getResize);
    };

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return resize;
}
