import { createSignal, createEffect, onMount, For, Show, type Component } from "solid-js";

interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export const TableOfContents: Component<{ prev?: string; next?: string }> = (props) => {
  const [headings, setHeadings] = createSignal<TocItem[]>([]);
  const [activeId, setActiveId] = createSignal<string>("");
  const [tipText, setTipText] = createSignal<string>("");

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleHeadingClick = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);

      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  onMount(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = Array.from(article.querySelectorAll("h2, h3"));
    const items: TocItem[] = headingElements.map((el) => {
      if (!el.id) {
        const generatedId = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "";
        el.id = generatedId;
      }

      return {
        id: el.id,
        text: el.textContent || "",
        depth: parseInt(el.tagName.substring(1), 10),
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div class="hidden xl:block fixed top-24 right-[calc(50%-44rem)] w-64 p-4 font-mono text-xs select-none">
      <div class="h-4 text-right pr-4 italic text-fg-light mb-1">
        {tipText()}
      </div>

      <div class="flex items-center justify-end gap-3 mb-6 pr-4 border-b border-border/40 pb-3">
              <button
          onClick={handleScrollTop}
          class="hover:text-rose-500 transition-colors cursor-pointer bg-transparent border-none p-0"
          onMouseEnter={() => setTipText("Back to Top")}
          onMouseLeave={() => setTipText("")}
          title="Scroll to Top"
        >
          <span class="i-eva:arrow-upward-outline text-lg block"></span>
        </button>

        <Show when={props.prev}>
          <a
            href={`/blog/${props.prev}/`}
            class="hover:text-rose-500 transition-colors cursor-pointer"
            onMouseEnter={() => setTipText("Prev Post")}
            onMouseLeave={() => setTipText("")}
            title="Prev Post"
          >
            <span class="i-eva:arrow-back-outline text-lg block"></span>
          </a>
        </Show>

        <Show when={props.next}>
          <a
            href={`/blog/${props.next}/`}
            class="hover:text-rose-500 transition-colors cursor-pointer"
            onMouseEnter={() => setTipText("Next Post")}
            onMouseLeave={() => setTipText("")}
            title="Next Post"
          >
            <span class="i-eva:arrow-forward-outline text-lg block"></span>
          </a>
        </Show>

        <a
          href="/blog/"
          class="hover:text-rose-500 transition-colors cursor-pointer"
          onMouseEnter={() => setTipText("Back to Blog")}
          onMouseLeave={() => setTipText("")}
          title="Back to Blog Archive"
        >
          <span class="i-eva:menu-outline text-lg block"></span>
        </a>

        <button
          onClick={handlePrint}
          class="hover:text-rose-500 transition-colors cursor-pointer bg-transparent border-none p-0"
          onMouseEnter={() => setTipText("Print page")}
          onMouseLeave={() => setTipText("")}
          title="Print page"
        >
          <span class="i-solar:printer-minimalistic-outline text-lg block"></span>
        </button>
      </div>

      {/* List of sections */}
      <Show when={headings().length > 0}>
        <span class="block font-bold text-fg-light uppercase tracking-wider mb-2 pr-4 text-right">
          Contents
        </span>
        <ul class="space-y-2.5 list-none pl-0 m-0 pr-4 text-right max-h-[60vh] overflow-y-auto no-scrollbar direction-rtl">
          <For each={headings()}>
            {(item) => (
              <li class="truncate direction-ltr">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleHeadingClick(e, item.id)}
                  class="break-words transition-all duration-200 no-underline hover:text-rose-500"
                  class:text-rose-500={activeId() === item.id}
                  class:font-bold={activeId() === item.id}
                  class:text-fg-light={activeId() !== item.id}
                  class:opacity-100={activeId() === item.id}
                  class:opacity-70={activeId() !== item.id}
                  style={{
                    "padding-right": item.depth > 2 ? "12px" : "0px",
                  }}
                >
                  {item.text}
                </a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default TableOfContents;
