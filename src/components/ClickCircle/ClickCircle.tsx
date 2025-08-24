import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import './ClickCircle.scss';

const ClickCircle = () => {
  const [circle, setCircle] = useState<{
    x: number;
    y: number;
    id: number;
  } | null>(null);

  const circleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (circle && circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [circle]);

  useEffect(() => {
    const handleDown = (e: MouseEvent | TouchEvent) => {
      let clientX: number, clientY: number;

      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      setCircle({ x: clientX, y: clientY, id: Date.now() });
    };

    const handleUp = () => {
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.1,
          ease: "power2.in",
          onComplete: () => setCircle(null),
        });
      }
    };

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    window.addEventListener("touchstart", handleDown);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchstart", handleDown);
      window.removeEventListener("touchend", handleUp);
    };
  }, [circle]);

  return (
    <>
      {circle && (
        <div
          ref={circleRef}
          className='clickCircle'
          // Не в css, потому что зависят от координат клика
          style={{
            top: circle.y - 25,
            left: circle.x - 25,
          }}
        />
      )}
    </>
  );
};

export default ClickCircle;
