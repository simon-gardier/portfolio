import { For } from "solid-js";

interface LayerElement {
  id: string;
  src: string;
}

export default function HeroContainer() {
  const layers: LayerElement[] = [
    { id: "1-0", src: "/hero/1-0.png" },
    { id: "1-1", src: "/hero/1-1.png" },
    { id: "1-2", src: "/hero/1-2.png" },
    
    { id: "2-0", src: "/hero/2-0.png" },
    { id: "2-1", src: "/hero/2-1.png" },
    { id: "2-2", src: "/hero/2-2.png" },
    { id: "2-3", src: "/hero/2-3.png" },

    { id: "3-0", src: "/hero/3-0.png" },
    { id: "3-1", src: "/hero/3-1.png" },
    { id: "3-2", src: "/hero/3-2.png" }
  ];

  return (
    <div
      class="relative w-full aspect-video overflow-hidden border-b border-border rounded-b-xl md:rounded-b-2xl bg-slate-950 select-none shadow-md"
      style={{ cursor: "url('/hero/cursor.png'), pointer" }}
    >
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
            class="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
      </For>
    </div>
  );
}
