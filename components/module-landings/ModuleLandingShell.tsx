import type { ReactNode } from "react";

/** Оболочка лендинга модуля — без горизонтального скролла на мобильных. */
export function ModuleLandingShell({ children }: { children: ReactNode }) {
  return <div className="module-landing min-w-0 max-w-full overflow-x-clip">{children}</div>;
}
