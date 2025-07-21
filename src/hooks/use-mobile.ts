import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

// iOS-specific detection
export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState<boolean>(false);

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;
    const isInHomeApp = isIOSDevice && isStandalone;

    setIsIOS(isInHomeApp);
  }, []);

  return isIOS;
}

// Enhanced mobile detection including iOS home app
export function useIsMobileOrIOSHome() {
  const isMobile = useIsMobile();
  const isIOSHome = useIsIOS();

  return isMobile || isIOSHome;
}
