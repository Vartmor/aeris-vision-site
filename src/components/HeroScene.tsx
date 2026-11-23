import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function HeroScene({ image }: { image: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start start', 'end start'] });
  const offset = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const reducedMotion = useReducedMotion();

  return (
    <div className="hero-image" ref={frame} aria-hidden="true">
      <motion.img src={image} alt="" width="1672" height="941" fetchPriority="high"
        style={{ y: reducedMotion ? 0 : offset }} />
    </div>
  );
}
