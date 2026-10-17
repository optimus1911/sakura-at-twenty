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
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
    free: "h-full w-full",
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#30263F]/30 backdrop-blur-sm ${aspectClass} ${className}`}
    >
      <Image
        src={hasError ? fallbackSrc : imgSrc}
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
            setImgSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
}
