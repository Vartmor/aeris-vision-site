import { useEffect } from 'react';
import { useAnimate, useReducedMotion, stagger } from 'framer-motion';

export default function HeroCopy({ journalUrl }: { journalUrl: string }) {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const entrance = animate(
      '[data-hero-line]',
      { opacity: [0.2, 1], y: [30, 0] },
      { delay: stagger(0.09), duration: 0.78, ease: [0.16, 1, 0.3, 1] },
    );
    return () => entrance.stop();
  }, [animate, reducedMotion]);

  return (
    <div className="hero-copy" ref={scope}>
      <p className="eyebrow hero-eyebrow" data-hero-line>Afet sonrası uydu araştırması</p>
      <h1><span data-hero-line>Her tahmin,</span><span data-hero-line>incelenebilir</span><span data-hero-line>bir kayıt.</span></h1>
      <p className="hero-description" data-hero-line>Uydu görüntülerinden görünür bina hasarını araştırıyoruz. Burada modeli nasıl kurduğumuzu ve nerede yanıldığını yayımlıyoruz.</p>
      <div className="hero-actions" data-hero-line>
        <a className="button button--paper" href={journalUrl}>Geliştirme günlüğü <span aria-hidden="true">↗</span></a>
        <a className="hero-link" href="#sonuclar">Sonuçlara bak <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  );
}
