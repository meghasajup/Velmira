import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { testimonialPageStyles } from "../assets/dummyStyles";

import T1 from "../assets/T1.png";
import T2 from "../assets/T2.png";
import T3 from "../assets/T3.png";
import T4 from "../assets/T4.png";

const cards = [
  {
    id: 1,
    title: "“Elegance and Precision” — Asha K.",
    meta: "Asha K. • July 5, 2025",
    excerpt:
      "I gifted the Swarovski piece to myself and it instantly became my go-to. The crystal detailing catches light beautifully and it keeps perfect time.",
    img: T1,
  },
  {
    id: 2,
    title: "“Built Like a Tank” — Rohit S.",
    meta: "Rohit S. • June 26, 2025",
    excerpt:
      "I wear my G-Shock for work, gym and hikes. Zero scratches so far. Shock resistance and battery life are insanely good.",
    img: T2,
  },
  {
    id: 3,
    title: "“Sleek & Subtle” — Priya M.",
    meta: "Priya M. • May 15, 2025",
    excerpt:
      "Minimal dial, thin case and premium strap. Perfect for office blazers or weekend denim.",
    img: T3,
  },
  {
    id: 4,
    title: "“A Time Capsule” — Arjun D.",
    meta: "Arjun D. • May 2, 2025",
    excerpt:
      "Vintage styling with modern comfort. The domed crystal gives it beautiful character.",
    img: T4,
  },
];

const Testimonial = () => {
  const scroller = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  const momentumRef = useRef(null);

  const stopMomentum = () => {
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
      momentumRef.current = null;
    }
  };

  const startMomentum = () => {
    const el = scroller.current;
    if (!el) return;

    stopMomentum();

    const friction = 0.92;
    const minVelocity = 0.2;

    const animate = () => {
      if (Math.abs(velocity.current) < minVelocity) {
        stopMomentum();
        return;
      }

      el.scrollLeft -= velocity.current;
      velocity.current *= friction;

      momentumRef.current = requestAnimationFrame(animate);
    };

    momentumRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleUp = () => {
      if (!isDown.current) return;

      isDown.current = false;
      scroller.current?.classList.remove("cursor-grabbing");
      startMomentum();
    };

    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
      stopMomentum();
    };
  }, []);

  const onMouseDown = (e) => {
    const el = scroller.current;
    if (!el) return;

    stopMomentum();
    isDown.current = true;

    el.classList.add("cursor-grabbing");

    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;

    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;

    e.preventDefault();

    const el = scroller.current;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;

    el.scrollLeft = scrollLeft.current - walk;

    const now = Date.now();
    const dx = e.pageX - lastX.current;
    const dt = now - lastTime.current || 1;

    velocity.current = (dx / dt) * 12;

    lastX.current = e.pageX;
    lastTime.current = now;
  };

  const onTouchStart = (e) => {
    const el = scroller.current;
    if (!el) return;

    stopMomentum();
    isDown.current = true;

    startX.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;

    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isDown.current) return;

    const el = scroller.current;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = x - startX.current;

    el.scrollLeft = scrollLeft.current - walk;

    const now = Date.now();
    const dx = e.touches[0].pageX - lastX.current;
    const dt = now - lastTime.current || 1;

    velocity.current = (dx / dt) * 12;

    lastX.current = e.touches[0].pageX;
    lastTime.current = now;
  };

  return (
    <section className={testimonialPageStyles.pageSection}>
      <div className={testimonialPageStyles.container}>
        <motion.h2
          className={testimonialPageStyles.title}
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          THE WATCH JOURNAL
        </motion.h2>

        <div
          ref={scroller}
          className={testimonialPageStyles.scroller}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={() => {
            if (isDown.current) {
              isDown.current = false;
              startMomentum();
            }
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          style={{
            cursor: "grab",
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            userSelect: "none",
          }}
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              className={testimonialPageStyles.card}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 1, 0.5, 1],
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, y: -8 }}
            >
              <div className={testimonialPageStyles.imageBlock}>
                <motion.img
                  src={card.img}
                  alt={card.title}
                  className={testimonialPageStyles.image}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <div className={testimonialPageStyles.contentBlock}>
                <h3 className={testimonialPageStyles.cardTitle}>
                  {card.title}
                </h3>

                <p className={testimonialPageStyles.cardMeta}>
                  {card.meta}
                </p>

                <p className={testimonialPageStyles.cardExcerpt}>
                  {card.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .${testimonialPageStyles.scroller}::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;