"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday-config";

// Declare YT on window for TypeScript
declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
            onError?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

export function MusicController() {
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const playerRef = useRef<YTPlayer | null>(null);
  const containerId = "youtube-birthday-audio-player";

  const songConfig = BIRTHDAY_CONFIG.audio.youtube;

  // Initialize YouTube Iframe API
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isSubscribed = true;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player(containerId, {
          videoId: songConfig.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            playlist: songConfig.videoId,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (event) => {
              if (!isSubscribed) return;
              setPlayerReady(true);
              setHasError(false);
              event.target.setVolume(70);
            },
            onStateChange: (event) => {
              if (!isSubscribed) return;
              // 1 = PLAYING, 2 = PAUSED, 3 = BUFFERING, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
                setIsBuffering(false);
              } else if (event.data === 2) {
                setIsPlaying(false);
                setIsBuffering(false);
              } else if (event.data === 3) {
                setIsBuffering(true);
              } else if (event.data === 0) {
                // Loop
                event.target.playVideo();
              }
            },
            onError: (event) => {
              if (!isSubscribed) return;
              setHasError(true);
              setIsPlaying(false);
              setIsBuffering(false);
              if (event.data === 101 || event.data === 150) {
                setErrorMessage("Embedding restricted by YouTube. Tap to listen directly!");
              } else {
                setErrorMessage("Playback unavailable. Tap to open on YouTube.");
              }
            },
          },
        });
      } catch {
        if (isSubscribed) {
          setHasError(true);
          setErrorMessage("Failed to load YouTube player.");
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Load YouTube API script if not present
      if (!document.getElementById("youtube-iframe-api-script")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        if (isSubscribed) initPlayer();
      };
    }

    return () => {
      isSubscribed = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, [songConfig.videoId]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch {
      setHasError(true);
      setErrorMessage("Please tap to open directly on YouTube.");
    }
  }, [isPlaying, playerReady]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch {}
  }, [isMuted, playerReady]);

  return (
    <>
      {/* Hidden container for YouTube iframe player API */}
      <div
        className="fixed -bottom-32 -right-32 w-2 h-2 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id={containerId} />
      </div>

      {/* Floating Persisting Music Control Widget */}
      <aside
        aria-label="Birthday Soundtrack Player"
        className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-1.5"
      >
        {/* Error notification banner if embedding blocked */}
        {hasError && errorMessage && (
          <div className="bg-[#2E1838]/95 text-[#FFF8F1] border border-[#EAB7D0]/40 px-3 py-1.5 rounded-xl text-xs backdrop-blur-xl shadow-2xl max-w-xs animate-in fade-in flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#E7CB92] shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex items-center gap-2.5 px-3 sm:px-3.5 py-2 rounded-full bg-[#20152C]/90 border border-[#EAB7D0]/35 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,8,25,0.7)] text-[#FFF8F1]">
          {/* Animated sound wave bars when playing */}
          <div className="flex items-center gap-0.5 h-4 w-4 shrink-0">
            <span
              className={`w-0.5 bg-[#EAB7D0] rounded-full transition-all duration-300 ${
                isPlaying ? "h-4 animate-pulse" : "h-1.5"
              }`}
            />
            <span
              className={`w-0.5 bg-[#DCD3F8] rounded-full transition-all duration-300 ${
                isPlaying ? "h-3 animate-pulse delay-75" : "h-2"
              }`}
            />
            <span
              className={`w-0.5 bg-[#E7CB92] rounded-full transition-all duration-300 ${
                isPlaying ? "h-4 animate-pulse delay-150" : "h-1"
              }`}
            />
          </div>

          {/* Song info & status */}
          <div className="flex flex-col text-left pr-1 max-w-[140px] sm:max-w-[170px]">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-[#FFF8F1] truncate">
                {songConfig.title}
              </span>
            </div>
            <span className="text-[10px] text-[#EAB7D0]/85 truncate">
              {hasError
                ? "Open on YouTube"
                : isBuffering
                ? "Buffering..."
                : isPlaying
                ? "Now Playing"
                : "Tap Play"}
            </span>
          </div>

          {/* Play/Pause Button */}
          {!hasError && (
            <button
              onClick={togglePlay}
              disabled={!playerReady}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#EAB7D0] to-[#E7CB92] text-[#251535] flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50"
            >
              {isBuffering ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>
          )}

          {/* Mute toggle */}
          {!hasError && isPlaying && (
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-[#EAB7D0] hover:text-[#FFF8F1] transition-colors p-1"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Direct YouTube Link Fallback / Watch Button */}
          <a
            href={songConfig.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open song on YouTube"
            title="Open on YouTube"
            className="text-[#E7CB92] hover:text-[#FFF8F1] transition-colors p-1 flex items-center gap-1 text-[11px]"
          >
            {hasError ? (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAB7D0]/20 text-[#FFF8F1] font-medium text-[10px]">
                <ExternalLink className="w-3 h-3" />
                Listen
              </span>
            ) : (
              <ExternalLink className="w-3.5 h-3.5" />
            )}
          </a>
        </div>
      </aside>
    </>
  );
}
