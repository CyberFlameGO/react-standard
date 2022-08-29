import { MutableRefObject, useEffect, useState } from "react";

/**
 * This hook will automatically scroll up and down the referenced component, at the specified velocity and initial direction.
 * @param ref The component that will be scrolled.
 * @param velocity The velocity at which the component will be scrolled.
 * @param initialDirection The initial direction of the scroll.
 * @example ```
 *  const ref = useRef();
 *  useAutoScroll(ref, 20, "down");
 *
 *  <table ref={ref}></table>
 * ```
 */
export default function useAutoScroll<T extends MutableRefObject<any>>(
  ref: T,
  velocity: number,
  initialDirection: "up" | "down" = "down"
) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">(
    initialDirection
  );
  useEffect(() => {
    const i = setInterval(() => {
      if (ref?.current) {
        if (
          ref.current.scrollTop + ref.current.clientHeight ===
          ref.current.scrollHeight
        ) {
          setScrollDirection("up");
        }
        if (ref.current.scrollTop === 0 && scrollDirection !== "down") {
          setScrollDirection("down");
        }
        ref.current.scrollBy({
          top: scrollDirection === "down" ? velocity : -velocity,
          behavior: "smooth",
        });
      }
    }, 1000);
    return () => clearInterval(i);
  }, [scrollDirection, velocity, ref]);
}
