"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
      <div className="text-center max-w-lg px-6">
        <h1 className="text-8xl font-bold mb-4">
          <span className="text-[#4488ff]">4</span>
          <span className="text-white/20">0</span>
          <span className="bg-gradient-to-r from-[#e8503a] to-[#ff8866] bg-clip-text text-transparent">
            4
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-2">
          This page got lost between the
        </p>
        <p className="text-lg mb-8">
          <span className="text-[#4488ff] font-mono">technical</span> and{" "}
          <span className="bg-gradient-to-r from-[#e8503a] to-[#ff8866] bg-clip-text text-transparent font-medium">
            creative
          </span>{" "}
          dimensions.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-[#4488ff] to-[#2266dd] text-[#0a0a0f] font-medium rounded transition-opacity hover:opacity-90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
