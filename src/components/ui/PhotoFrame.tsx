
"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PhotoFrameProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "free";
  className?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  priority?: boolean;
}

const BASE_PATH = "/sakura-at-twenty";

function resolveImagePath(path: string): string {
  // Leave external URLs, data URLs, and other non-root paths unchanged.
  if (
    /^(https?:\/\/|data:|blob:)/i.test(path) ||
    !path.startsWith("/")
  ) {
    return path;
  }

  // Avoid adding the base path twice.
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) {
    return path;
  }

  return `${BASE_PATH}${path}`;
}

export function PhotoFrame({
  src,
  fallbackSrc,
  alt,
  aspectRatio = "portrait",
  className = "",
  objectFit = "cover",
  objectPosition = "center",
  priority = false,
}: PhotoFrameProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveImagePath(src));
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
    free: "h-full w-full",
  }[aspectRatio];

  const resolvedFallback = resolveImagePath(fallbackSrc);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#30263F]/30 backdrop-blur-sm ${aspectClass} ${className}`}
    >
      <Image
        src={hasError ? resolvedFallback : imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`transition-all duration-700 ${
          objectFit === "contain" ? "object-contain" : "object-cover"
        }`}
        style={{ objectPosition }}
        priority={priority}
        unoptimized
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
      />
    </div>
  );
}
