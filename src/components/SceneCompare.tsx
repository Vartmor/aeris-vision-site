import { useId, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const roofs = [
  ['145,294 376,241 397,358 171,401', 'ordinary'],
  ['612,395 770,323 806,418 653,490', 'study'],
  ['1168,93 1293,43 1324,134 1200,181', 'ordinary'],
  ['896,213 1045,147 1091,245 941,316', 'ordinary'],
  ['418,555 549,488 588,586 454,654', 'study'],
  ['147,794 275,749 310,858 173,899', 'ordinary'],
  ['665,765 823,728 847,835 688,877', 'ordinary'],
  ['925,515 1004,484 1040,564 966,604', 'study'],
  ['1157,449 1328,397 1364,472 1190,548', 'ordinary'],
];

export default function SceneCompare({ image, compactImage }: { image: string; compactImage: string }) {
  const sliderId = useId();
  const [value, setValue] = useState(54);
  const progress = useMotionValue(54);
  const clipPath = useTransform(progress, (percent) => `inset(0 0 0 ${percent}%)`);
  const left = useTransform(progress, (percent) => `${percent}%`);

  return (
    <div className="compare-frame" data-visual>
      <div className="frame-header">
        <span><i aria-hidden="true" /> Temsili uydu sahnesi</span>
        <label htmlFor={sliderId}>Görüntü ayırıcı</label>
      </div>
      <div className="compare-scene">
        <img src={image}
          srcSet={`${compactImage} 724w, ${image} 1448w`}
          sizes="(max-width: 740px) calc(100vw - max(44px, 10vw)), (max-width: 900px) calc(58vw - 22px), (max-width: 1422px) 53vw, 750px"
          width="1448" height="1086" loading="lazy" decoding="async"
          alt="Yol boyunca dağılmış binaları gösteren temsili uydu görüntüsü" />
        <motion.div className="compare-annotation" style={{ clipPath }} aria-hidden="true">
          <svg viewBox="0 0 1448 1086" preserveAspectRatio="none" focusable="false">
            {roofs.map(([outline, kind]) => <polygon key={outline} points={outline} className={kind} />)}
          </svg>
        </motion.div>
        <span className="compare-label compare-label--image">Görüntü</span>
        <span className="compare-label compare-label--mask">Bina adayları</span>
        <motion.div className="compare-divider" style={{ left }} aria-hidden="true">
          <span>‹ ›</span>
        </motion.div>
        <input id={sliderId} className="compare-input" type="range" min="0" max="100" value={value}
          aria-valuetext={`Ayırıcı yüzde ${value}`}
          onChange={(event) => {
            const next = Number(event.target.value);
            setValue(next);
            progress.set(next);
          }} />
      </div>
      <div className="frame-legend"><span><b aria-hidden="true"></b> Örnek aday sınırı</span><span><b className="dashed" aria-hidden="true"></b> İnceleme işareti</span></div>
    </div>
  );
}
