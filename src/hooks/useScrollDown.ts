import { useEffect, useState } from 'react';

export const useScrollDown = () => {
  const [isScrollDown, setIsScrollDown] = useState<boolean>(true);
  const [prevScroll, setPrevScroll] = useState<number>(0);

  const scrollHandler = () => {
    if (prevScroll >= window.pageYOffset || window.pageYOffset <= 140) {
      setIsScrollDown(true);
    } else if (prevScroll < window.pageYOffset) {
      setIsScrollDown(false);
    }
    setPrevScroll(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [prevScroll]);

  return { isScrollDown };
};
