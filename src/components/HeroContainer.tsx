import { For } from "solid-js";

interface LayerElement {
  id: string;
  src: string;
  amplitude: number;
}

export default function HeroContainer() {
  const layers: LayerElement[] = [
    { id: "1-0", src: "/hero/1-0.png", amplitude: 4 },
    { id: "1-1", src: "/hero/1-1.png", amplitude: 5 },
    { id: "1-2", src: "/hero/1-2.png", amplitude: 6 },

    { id: "2-0", src: "/hero/2-0.png", amplitude: 9 },
    { id: "2-1", src: "/hero/2-1.png", amplitude: 11 },
    { id: "2-2", src: "/hero/2-2.png", amplitude: 13 },
    { id: "2-3", src: "/hero/2-3.png", amplitude: 15 },

    { id: "3-0", src: "/hero/3-0.png", amplitude: 19 },
    { id: "3-1", src: "/hero/3-1.png", amplitude: 22 },
    { id: "3-2", src: "/hero/3-2.png", amplitude: 26 }
  ];

  return (
    <div
      class="relative w-full aspect-video overflow-hidden border-b border-border rounded-b-xl md:rounded-b-2xl bg-slate-950 select-none shadow-md"
      style={{ cursor: "url('/hero/cursor.png'), pointer" }}
    >
      <style>
        {`
          @keyframes hero-wind {
            from { transform: scale(1.04) translateX(calc(var(--amp) * -1)); }
            to { transform: scale(1.04) translateX(var(--amp)); }
          }
          .hero-wind-layer {
            animation: hero-wind 12s ease-in-out infinite alternate;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-wind-layer { animation: none; }
          }
        `}
      </style>

      <img
        src="/hero/0-0.png"
        alt="Sky Background"
        class="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <For each={layers}>
        {(layer) => (
          <img
            src={layer.src}
            alt={`Parallax ${layer.id}`}
            class="hero-wind-layer absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ "--amp": `${layer.amplitude}px` }}
          />
        )}
      </For>
    </div>
  );
}
