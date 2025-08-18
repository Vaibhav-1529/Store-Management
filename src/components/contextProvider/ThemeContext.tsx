"use client";

import { Theme } from "@radix-ui/themes";
import { createContext, ReactNode, useState } from "react";

export const ThemeContexts = createContext<{
  isdark: boolean;
  setIsdark: ((value: boolean) => void) | null;
}>({
  isdark: true,
  setIsdark: null,
});
export default function ThemeContext({ children }: { children: ReactNode }) {
  const [isdark, setIsdark] = useState(false);
  return (
    <ThemeContexts.Provider value={{ isdark, setIsdark }}>
      <Theme accentColor="green">{children}</Theme>
    </ThemeContexts.Provider>
  );
}
