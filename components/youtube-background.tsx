"use client";

import React from "react"

import { useEffect, useRef, useState, useCallback } from "react";

interface YouTubeBackgroundProps {
  videoId: string;
  fallbackImage: string;
  fallbackAlt: string;
  className?: string;
  externalPlayerRef?: YouTubePlayerRef;
}

// Extend Window to include YT API types
declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        config: {
          videoId: string;
          playerVars: Record<string, number | string>;
          events: Record<string, (e: unknown) => void>;
        }
      ) => YTPlayerInstance;
      PlayerState: { PLAYING: number; ENDED: number; BUFFERING: number };
    };
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export interface YTPlayerInstance {
  playVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
}

export type YouTubePlayerRef = React.MutableRefObject<YTPlayerInstance | null>;

export function YouTubeBackground({
  videoId,
  fallbackImage,
  fallbackAlt,
  className = "",
  externalPlayerRef,
}: YouTubeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  // Detect mobile / small screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load the YouTube IFrame API script once
  useEffect(() => {
    if (isMobile) return;
    if (window.YT && window.YT.Player) {
      setApiLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (existingScript) {
      // Script exists but API not ready yet; wait for callback
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        setApiLoaded(true);
      };
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      setApiLoaded(true);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }, [isMobile]);

  // Initialize the player once API is loaded
  const initPlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return;

    // Create a child div for the player (YT replaces the element)
    const playerEl = document.createElement("div");
    containerRef.current.appendChild(playerEl);

    const player = new window.YT.Player(playerEl, {
      videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        loop: 1,
        playlist: videoId, // Required for loop to work on single video
        start: 0,
        disablekb: 1,
        fs: 0,
        cc_load_policy: 0,
        origin: typeof window !== "undefined" ? window.location.origin : "",
      },
      events: {
        onReady: (event: unknown) => {
          const player = (event as { target: YTPlayerInstance }).target;
          player.mute();
          player.playVideo();
        },
        onStateChange: (event: unknown) => {
          const e = event as { data: number };
          if (e.data === window.YT.PlayerState.PLAYING) {
            // Small delay so the first frame renders before we fade in
            setTimeout(() => setIsVideoReady(true), 400);
          }
        },
      },
    });

    playerRef.current = player;
    if (externalPlayerRef) {
      externalPlayerRef.current = player;
    }
  }, [videoId, externalPlayerRef]);

  useEffect(() => {
    if (apiLoaded && !isMobile) {
      initPlayer();
    }
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Player may already be destroyed
        }
        playerRef.current = null;
      }
    };
  }, [apiLoaded, isMobile, initPlayer]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Fallback static image -- always rendered, fades out when video is ready */}
      <img
        src={fallbackImage || "/placeholder.svg"}
        alt={fallbackAlt}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
          isVideoReady && !isMobile ? "opacity-0" : "opacity-100"
        }`}
        fetchPriority="high"
      />

      {/* YouTube video container -- only on desktop */}
      {!isMobile && (
        <div
          ref={containerRef}
          className={`pointer-events-none absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{
            /* Scale the 16:9 iframe to cover the full viewport */
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "max(177.78vh, 100vw)", // 16:9 width
            height: "max(56.25vw, 100vh)", // 16:9 height
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
}
