import { onMount, onCleanup, createSignal, createEffect, type Component } from "solid-js";
import { GISCUS } from "../config";

export const Giscus: Component = () => {
  const [container, setContainer] = createSignal<HTMLDivElement>();
  const [isDark, setIsDark] = createSignal(false);

  const getTheme = () => (isDark() ? GISCUS.dark : GISCUS.light);

  const getScriptElement = (theme: string) => {
    const element = document.createElement("script");

    element.setAttribute("src", "https://giscus.app/client.js");
    element.setAttribute("data-repo", GISCUS.repo);
    element.setAttribute("data-repo-id", GISCUS.repoId);
    element.setAttribute("data-category", GISCUS.category);
    element.setAttribute("data-category-id", GISCUS.categoryId);
    element.setAttribute("data-theme", theme);
    element.setAttribute("data-lang", "en");
    element.setAttribute("data-mapping", "pathname");
    element.setAttribute("data-strict", "0");
    element.setAttribute("data-reactions-enabled", "1");
    element.setAttribute("data-emit-metadata", "0");
    element.setAttribute("data-input-position", "top");
    element.setAttribute("data-loading", "lazy");
    element.setAttribute("crossorigin", "anonymous");
    element.setAttribute("async", "true");

    return element;
  };

  const updateGiscus = (theme: string) => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme
          }
        }
      },
      "https://giscus.app"
    );
  };

  onMount(() => {
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    container()?.appendChild(getScriptElement(getTheme()));

    onCleanup(() => {
      observer.disconnect();
    });
  });

  createEffect(() => {
    updateGiscus(getTheme());
  });

  return <div ref={setContainer} class="giscus" />;
};

export default Giscus;
