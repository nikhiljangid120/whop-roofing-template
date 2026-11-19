/**
 * Whop Pixel Event Tracking Helper
 * 
 * Supports native whop.track calls for:
 *  - estimate_requested
 *  - service_viewed
 *  - deposit_started
 * 
 * Also logs formatted messages to DevTools console and broadcasts to LivePixelMonitor UI
 * so the reviewer can easily verify pixel events during the screen recording.
 */

declare global {
  interface Window {
    whop?: {
      (action: string, eventName: string, data?: Record<string, any>): void;
      track?: (eventName: string, data?: Record<string, any>) => void;
      q?: any[];
    };
  }
}

export type WhopPixelEventType =
  | "estimate_requested"
  | "service_viewed"
  | "deposit_started";

export interface PixelEventPayload {
  eventName: WhopPixelEventType;
  timestamp: string;
  data: Record<string, any>;
}

export function trackWhopEvent(
  eventName: WhopPixelEventType,
  data: Record<string, any> = {}
) {
  const timestamp = new Date().toISOString();
  const payload: PixelEventPayload = {
    eventName,
    timestamp,
    data,
  };

  // 1. Call native whop.track if available on window
  try {
    if (typeof window !== "undefined") {
      if (typeof window.whop?.track === "function") {
        window.whop.track(eventName, data);
      } else if (typeof window.whop === "function") {
        window.whop("track", eventName, data);
      } else {
        // Fallback queue if script is still loading
        window.whop = window.whop || function () {
          (window.whop!.q = window.whop!.q || []).push(arguments);
        };
        (window.whop.q = window.whop.q || []).push(["track", eventName, data]);
      }
    }
  } catch (err) {
    console.warn("[Whop Pixel] Failed to invoke whop.track:", err);
  }

  // 2. High-visibility console log for the screen recording review
  if (typeof window !== "undefined") {
    console.log(
      `%c[WHOP PIXEL]%c ${eventName} %c${JSON.stringify(data)}`,
      "background: #FF6243; color: white; font-weight: bold; padding: 2px 6px; border-radius: 4px;",
      "background: #1C2541; color: #38BDF8; font-weight: bold; padding: 2px 6px;",
      "color: #94A3B8; font-family: monospace;"
    );

    // 3. Dispatch custom event for our visual on-screen LivePixelMonitor
    window.dispatchEvent(
      new CustomEvent("whop:pixel:event", {
        detail: payload,
      })
    );
  }

  return payload;
}

