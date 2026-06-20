import { createSignal, onMount, onCleanup, For, Show } from "solid-js";

interface LayerElement {
  id: string;
  src: string;
  windSpeed: number;
  mouseFactorX: number;
  mouseFactorY: number;
}

export default function HeroContainer() {
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  const [currMousePos, setCurrMousePos] = createSignal({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = createSignal(false);
  const [time, setTime] = createSignal(0);

  const layers: LayerElement[] = [
    { id: "1-0", src: "/hero/1-0.png", windSpeed: 2.5, mouseFactorX: 0.015, mouseFactorY: 0.008 },
    { id: "1-1", src: "/hero/1-1.png", windSpeed: 3.8, mouseFactorX: 0.022, mouseFactorY: 0.012 },
    { id: "1-2", src: "/hero/1-2.png", windSpeed: 5.2, mouseFactorX: 0.030, mouseFactorY: 0.016 },
    
    { id: "2-0", src: "/hero/2-0.png", windSpeed: 7.0, mouseFactorX: 0.045, mouseFactorY: 0.024 },
    { id: "2-1", src: "/hero/2-1.png", windSpeed: 9.2, mouseFactorX: 0.055, mouseFactorY: 0.030 },
    { id: "2-2", src: "/hero/2-2.png", windSpeed: 11.5, mouseFactorX: 0.065, mouseFactorY: 0.036 },
    { id: "2-3", src: "/hero/2-3.png", windSpeed: 13.8, mouseFactorX: 0.075, mouseFactorY: 0.042 },

    { id: "3-0", src: "/hero/3-0.png", windSpeed: 17.0, mouseFactorX: 0.100, mouseFactorY: 0.055 },
    { id: "3-1", src: "/hero/3-1.png", windSpeed: 21.0, mouseFactorX: 0.120, mouseFactorY: 0.065 },
    { id: "3-2", src: "/hero/3-2.png", windSpeed: 26.0, mouseFactorX: 0.140, mouseFactorY: 0.080 }
  ];

  let containerRef!: HTMLDivElement;
  let animFrameId: number;

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef) return;
    const rect = containerRef.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // [-0.5, 0.5]
    const y = (e.clientY - rect.top) / rect.height - 0.5; // [-0.5, 0.5]
    setTargetMousePos({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const [targetMousePos, setTargetMousePos] = createSignal({ x: 0, y: 0 });

  onMount(() => {
    const loop = (timestamp: number) => {
      setTime(timestamp / 1000);

      const target = isHovering() ? targetMousePos() : { x: 0, y: 0 };
      const curr = currMousePos();
      setCurrMousePos({
        x: curr.x + (target.x - curr.x) * 0.1,
        y: curr.y + (target.y - curr.y) * 0.1
      });

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);

    onCleanup(() => {
      cancelAnimationFrame(animFrameId);
    });
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      class="relative w-full aspect-video overflow-hidden border-b border-border rounded-b-xl md:rounded-b-2xl bg-slate-950 select-none shadow-md cursor-pointer"
    >
      <img
        src="/hero/0-0.png"
        alt="Sky Background"
        class="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          transform: `translate3d(${currMousePos().x * -4}px, ${currMousePos().y * -2}px, 0) scale(1.02)`,
          transition: isHovering() ? "none" : "transform 0.5s ease-out"
        }}
      />

      <For each={layers}>
        {(layer) => {
          const driftX = (time() * layer.windSpeed) % 100;
          const mouseX = currMousePos().x * -layer.mouseFactorX * 250;
          const mouseY = currMousePos().y * -layer.mouseFactorY * 120;

          return (
            <div
              class="absolute inset-0 w-full h-full pointer-events-none parallax-layer"
              style={{
                transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
                transition: isHovering() ? "none" : "transform 0.6s cubic-bezier(0.1, 0.8, 0.2, 1)"
              }}
            >
              <div class="relative w-full h-full overflow-hidden flex flex-row">
                <img
                  src={layer.src}
                  alt={`Parallax ${layer.id}`}
                  class="absolute top-0 w-full h-full object-cover pointer-events-none"
                  style={{
                    left: `${-driftX}%`,
                    "min-width": "100%"
                  }}
                />
                <img
                  src={layer.src}
                  alt={`Parallax ${layer.id} loop`}
                  class="absolute top-0 w-full h-full object-cover pointer-events-none"
                  style={{
                    left: `${100 - driftX}%`,
                    "min-width": "100%"
                  }}
                />
              </div>
            </div>
          );
        }}
      </For>

      <div class="absolute bottom-4 left-4 z-30 bg-slate-950/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg pointer-events-none">
        <p class="text-[10px] font-mono text-white/60 uppercase tracking-widest my-0">
          Interactive Environment
        </p>
        <p class="text-xs font-semibold text-sky-400 font-mono my-0">
          Wind Velocity: Simulating • Mouse: {isHovering() ? `[${Math.round(currMousePos().x * 100)}, ${Math.round(currMousePos().y * 100)}]` : "Idle"}
        </p>
      </div>
    </div>
  );
}
