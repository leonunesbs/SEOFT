"use client";

import * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  // iOS home app detection
  React.useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;
    const isInHomeApp = isIOSDevice && isStandalone;

    if (isInHomeApp) {
      document.body.classList.add("ios-home-app");
    } else {
      document.body.classList.remove("ios-home-app");
    }
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
