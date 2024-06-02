import { ReactNode } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  callback: () => void,
) => {
  const ref = useRef<T>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as ReactNode)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return ref;
};
