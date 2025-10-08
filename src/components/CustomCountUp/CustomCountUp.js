// "use client";

// import CountUp from "react-countup";

// export default function CustomCountUp({ start, end, duration }) {
//   return (
//     <CountUp
//       start={start || 0}
//       end={end}
//       duration={duration || 5}
//       separator=" "
//       enableScrollSpy={true}
//     />
//   );
// }

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

export default function CustomCountUp({ start = 0, end = 0, duration = 5 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <span>{end}</span>; // fallback during SSR

  return (
    <CountUp
      start={start}
      end={end}
      duration={duration}
      separator=" "
      enableScrollSpy
    />
  );
}
