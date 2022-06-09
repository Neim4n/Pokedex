import { useEffect, useState } from 'react';

export const useOpenTypes = (isScrollDown :any = null) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerClickHandler = (e:any) => {
    if (e.target.closest('.types__button')) setIsOpen(false);
    else if (e.target.closest('.open-types-button')) setIsOpen(!isOpen);
    else if ((e.target.closest('.button__container') || e.target.closest('.header__types')) && isOpen) setIsOpen(true);
    else if (e.target.closest('.header__container')) setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [isScrollDown]);

  return { isOpen, headerClickHandler };
};
