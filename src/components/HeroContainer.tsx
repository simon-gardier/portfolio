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
      class="relative h-[100vh] overflow-hidden border-b border-border rounded-b-sm md:rounded-b-md bg-slate-950 select-none shadow-md"
      style={{ cursor: "url('/hero/cursor.png'), pointer" }}
    >
      <style>
        {`
          @keyframes hero-wind-mobile {
            from { transform: translateX(calc(var(--amp) * -1)); }
            to { transform: translateX(var(--amp)); }
          }
          @keyframes hero-wind-desktop {
            from { transform: scale(1.04) translateX(calc(var(--amp) * -1)); }
            to { transform: scale(1.04) translateX(var(--amp)); }
          }
          .hero-wind-layer {
            animation: hero-wind-mobile 12s ease-in-out infinite alternate;
            will-change: transform;
          }
          .hero-cloud-layer {
            object-fit: contain;
            object-position: center bottom;
          }
          @media (min-width: 768px) {
            .hero-wind-layer {
              animation-name: hero-wind-desktop;
            }
            .hero-cloud-layer {
              object-fit: cover;
              object-position: center;
            }
          }
          @keyframes hero-scroll-bounce {
            0%, 100% { transform: translate(-50%, 0); opacity: 0.65; }
            50% { transform: translate(-50%, 8px); opacity: 1; }
          }
          @keyframes hero-scroll-pulse {
            0%, 100% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.08); }
          }
          .hero-scroll-widget {
            animation: hero-scroll-bounce 1.6s ease-in-out infinite;
          }
          .hero-scroll-wheel {
            animation: hero-scroll-pulse 1.6s ease-in-out infinite;
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
            class="hero-wind-layer hero-cloud-layer absolute inset-0 w-full h-full pointer-events-none"
            style={{ "--amp": `${layer.amplitude}px` }}
          />
        )}
      </For>

      <a
        href="#main_index"
        class="hero-scroll-widget absolute top-[80%] left-1/2 z-10 -translate-x-1/2 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
      >
        <div class="relative h-9 w-6 rounded-full border border-white/70 bg-black/25 backdrop-blur-[1px]">
          <div class="hero-scroll-wheel absolute left-1/2 top-1 h-2 w-1 -translate-x-1/2 rounded-full bg-white/85" />
        </div>
      </a>
    </div>
  );
}
