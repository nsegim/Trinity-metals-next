"use client"; // ✅ Required if you're using Next.js App Router (app/ directory)

import { useState, useEffect, useRef } from "react";

const IncrementCounter = ({ start = 0, end = 100, speed = 50 }) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef(null);

  // Observe when the counter enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // ✅ fixed typo: was "threhold"
    );

    const currentRef = counterRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Increment logic when in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < end) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, end, speed]);

  return <span ref={counterRef}>{count}</span>;
};

export default IncrementCounter;
