"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ target }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const timer = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  const items = [
    { label: "Gün", value: time?.days },
    { label: "Saat", value: time?.hours },
    { label: "Dakika", value: time?.minutes },
    { label: "Saniye", value: time?.seconds },
  ];

  return (
    <div className="grid grid-cols-4 divide-x divide-navy-100 border-y border-navy-100 bg-white">
      {items.map((item) => (
        <div key={item.label} className="py-6 text-center">
          <div className="text-2xl font-semibold text-navy-700 sm:text-3xl">
            {item.value !== undefined ? String(item.value).padStart(2, "0") : "--"}
          </div>
          <div className="mt-1 text-xs text-gray-500">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
