"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The real Beseam Fit storefront widget on a sample shoe page, as on the Fit
 * landing page. It runs in a same-origin iframe (public/fit-demo/) with its
 * network calls stubbed, so only the API answers are illustrative and no
 * shopper data leaves the page. The frame reports its content height and this
 * component sizes the iframe to it.
 */
const WIDGET_SRC = "/fit-demo/demo-widget.html";
const RESIZE_MESSAGE = "beseam-fit-demo-resize";
const INITIAL_HEIGHT = 540;
const MIN_HEIGHT = 220;
const MAX_HEIGHT = 2000;

export default function FitWidgetDemo({
  frameTitle,
  shopperLabel,
}: {
  frameTitle: string;
  shopperLabel: string;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow ||
        event.data?.type !== RESIZE_MESSAGE
      ) {
        return;
      }
      const next = Number(event.data.height);
      if (Number.isFinite(next) && next >= MIN_HEIGHT && next <= MAX_HEIGHT) {
        setHeight(next);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="overflow-hidden rounded-media border border-black/10 bg-white shadow-[0_30px_70px_-40px_rgba(17,19,24,0.55)]">
      <div className="flex items-center justify-between gap-3 border-b border-black/8 bg-white px-4 py-3 text-[12px] text-black/50 sm:px-6">
        <span className="flex items-center gap-3 font-semibold">
          <span aria-hidden="true" className="flex gap-1.5">
            <i className="block h-2.5 w-2.5 rounded-full bg-black/12" />
            <i className="block h-2.5 w-2.5 rounded-full bg-black/12" />
            <i className="block h-2.5 w-2.5 rounded-full bg-black/12" />
          </span>
          sample-shoe-store.myshopify.com
        </span>
        <span className="rounded-full border border-[#f0dfb7] bg-[#fcf4e5] px-3 py-1 text-[11px] font-bold text-[#906b18]">
          {shopperLabel}
        </span>
      </div>
      <iframe
        ref={frameRef}
        title={frameTitle}
        src={WIDGET_SRC}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        className="block w-full border-0 bg-white transition-[height] duration-200 motion-reduce:transition-none"
        style={{ height }}
      />
    </div>
  );
}
