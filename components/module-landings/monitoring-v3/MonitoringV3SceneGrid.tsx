/** Фоновая сетка как на hero — для единого визуала секций v3 */
export function MonitoringV3SceneGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07] motion-reduce:opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
      aria-hidden
    />
  );
}
