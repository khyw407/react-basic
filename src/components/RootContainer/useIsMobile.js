import React from 'react';

const useIsMobile = () => {
  const checkIsMobile = () => window.innerWidth < 1279.95;
  const [isMobile, setIsSmallScreen] = React.useState(checkIsMobile());

  React.useEffect(() => {
    const handleResize = () => {
      const _isMobile = checkIsMobile();
      if (_isMobile !== isMobile) {
        setIsSmallScreen(_isMobile);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return isMobile;
};

export default useIsMobile;

