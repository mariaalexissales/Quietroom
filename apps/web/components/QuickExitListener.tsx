"use client";

import { useEffect, useRef } from "react";

const ESC_KEY = "Escape";
const WINDOW_MS = 1500;
const THRESHOLD = 3;
const EXIT_URL = "https://google.com";

export default function QuickExitListener() {
  const pressesRef = useRef<number[]>([]);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key !== ESC_KEY) return;

      const now = Date.now();
      pressesRef.current = [...pressesRef.current, now].filter(
        (t) => now - t < WINDOW_MS,
      );

      console.log("presses:", pressesRef.current);

      if (pressesRef.current.length >= THRESHOLD) {
        pressesRef.current = [];
        window.location.replace(EXIT_URL);
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);
  return null;
}
