import { createSignal, createMemo, For, Show } from "solid-js";
import Fuse from "fuse.js";

export interface SearchItem {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

interface SearchEngineProps {
  data: SearchItem[];
}

export default function SearchEngine(props: SearchEngineProps) {
  const [query, setQuery] = createSignal("");

  const fuseOptions = {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "tags", weight: 0.3 },
      { name: "description", weight: 0.2 }
    ],
    threshold: 0.35,
    distance: 100
  };

  const fuse = createMemo(() => new Fuse(props.data, fuseOptions));

  // Derive results during server rendering too, so the initial page shows every item.
  const results = createMemo(() => {
    const q = query().trim();
    return q ? fuse().search(q).map((r) => r.item) : props.data;
  });

  return (
    <div class="space-y-6 font-sans">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-4 hstack pointer-events-none text-fg-light">
          <span class="i-solar:planet-linear text-xl opacity-75"></span>
        </span>
        <input
          type="text"
          placeholder="Search across blogs, papers, projects, tags..."
          value={query()}
          onInput={(e) => setQuery(e.currentTarget.value)}
          class="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-bg-dark/25 focus:bg-transparent text-fg-dark focus:border-sky-500/50 outline-none transition-all duration-200 text-base"
          aria-label="Search"
        />
        <Show when={query().length > 0}>
          <button
            onClick={() => setQuery("")}
            class="absolute inset-y-0 right-4 hstack text-fg-light hover:text-fg-dark transition-colors cursor-pointer"
            aria-label="Clear Search"
          >
            <span class="i-lucide:x text-base"></span>
          </button>
        </Show>
      </div>

      {/* Search Stats */}
      <div class="flex justify-between items-center text-xs font-mono text-fg-light px-1">
        <span>
          Showing {results().length} of {props.data.length} entries
        </span>
      </div>

      {/* Search Results Layout */}
      <div class="space-y-4">
        <For each={results()}>
          {(item) => (
            <a
              href={item.link}
              class="block border border-border rounded-xl p-4 md:p-5 hover:border-sky-500/30 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 transition-all duration-200 no-underline cursor-pointer group"
            >
              <h3 class="text-base md:text-lg font-bold text-fg-dark group-hover:text-sky-500 transition-colors my-0 leading-tight">
                {item.title}
              </h3>
              <p class="text-sm text-fg-light my-2 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <Show when={item.tags.length > 0}>
                <div class="flex flex-wrap gap-1 mt-3">
                  <For each={item.tags}>
                    {(tag) => (
                      <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-fg-light">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </Show>
            </a>
          )}
        </For>

        {/* Zero results state */}
        <Show when={results().length === 0}>
          <div class="text-center py-12 border border-dashed border-border rounded-xl">
            <span class="i-solar:planet-linear text-4xl text-fg-light"></span>
            <p class="text-fg-light text-sm font-mono mt-3">No match :(</p>
          </div>
        </Show>
      </div>
    </div>
  );
}
