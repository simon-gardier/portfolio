import { createSignal, createEffect, For, Show } from "solid-js";
import Fuse from "fuse.js";

export interface SearchItem {
  title: string;
  description: string;
  link: string;
  tags: string[];
  type: string; // 'Blog Post' | 'Project' | 'Publication'
}

interface SearchEngineProps {
  data: SearchItem[];
}

export default function SearchEngine(props: SearchEngineProps) {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal<SearchItem[]>([]);

  const fuseOptions = {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "tags", weight: 0.3 },
      { name: "description", weight: 0.2 }
    ],
    threshold: 0.35,
    distance: 100
  };

  let fuse = new Fuse(props.data, fuseOptions);
  
  createEffect(() => {
    fuse = new Fuse(props.data, fuseOptions);
  });

  createEffect(() => {
    const q = query().trim();
    if (!q) {
      setResults(props.data);
    } else {
      const searchResults = fuse.search(q);
      setResults(searchResults.map((r) => r.item));
    }
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
          {(item) => {
            const typeColors = () => {
              switch (item.type) {
                case "Blog Post":
                  return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/15";
                case "Project":
                  return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15";
                case "Publication":
                  return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15";
                default:
                  return "bg-neutral-500/10 text-neutral-600 border-neutral-500/15";
              }
            };

            return (
              <a
                href={item.link}
                class="block border border-border rounded-xl p-4 md:p-5 hover:border-sky-500/30 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 transition-all duration-200 no-underline cursor-pointer group"
              >
                <div class="flex items-center justify-between gap-3 mb-2">
                  {/* Segment Title */}
                  <h3 class="text-base md:text-lg font-bold text-fg-dark group-hover:text-sky-500 transition-colors my-0 leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Description content */}
                <p class="text-sm text-fg-light my-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Matching Tags / Keywords */}
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
            );
          }}
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
