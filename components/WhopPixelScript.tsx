"use client";

import Script from "next/script";

export function WhopPixelScript() {
  return (
    <>
      {/* Whop Pixel Initialization */}
      <Script
        id="whop-pixel-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.whop = window.whop || function() {
              (window.whop.q = window.whop.q || []).push(arguments);
            };
            window.whop.l = +new Date();
          `,
        }}
      />
      {/* Official Whop Pixel Loader */}
      <Script
        id="whop-pixel-loader"
        src="https://t.whop.tw/s.js"
        strategy="afterInteractive"
      />
    </>
  );
}

