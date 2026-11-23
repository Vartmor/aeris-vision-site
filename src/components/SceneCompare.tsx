import { useId, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const roofs = [
  ['523,81 569,89 563,122 517,115', 'ordinary'],
  ['498,135 556,147 550,182 492,174', 'ordinary'],
  ['502,200 552,199 549,241 501,240', 'study'],
  ['611,130 677,138 669,179 607,168', 'ordinary'],
  ['589,234 638,236 635,293 587,291', 'ordinary'],
  ['482,359 533,376 503,481 456,464', 'ordinary'],
  ['946,65 985,83 940,177 903,158', 'ordinary'],
  ['967,155 1008,88 1031,102 988,168', 'study'],
  ['1061,267 1116,173 1147,189 1092,282', 'ordinary'],
  ['966,377 998,315 1018,326 985,389', 'ordinary'],
  ['1006,415 1046,338 1080,358 1038,437', 'ordinary'],
  ['1289,564 1356,609 1297,700 1232,656', 'study'],
  ['1339,648 1392,680 1432,731 1368,782 1337,736 1311,719', 'ordinary'],
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
        <span><i aria-hidden="true" /> Narrowsburg, NY · 2019</span>
        <label htmlFor={sliderId}>Görüntü ayırıcı</label>
      </div>
      <div className="compare-scene">
        <img src={image}
          srcSet={`${compactImage} 724w, ${image} 1448w`}
          sizes="(max-width: 740px) calc(100vw - max(44px, 10vw)), (max-width: 900px) calc(58vw - 22px), (max-width: 1422px) 53vw, 750px"
          width="1448" height="1086" loading="lazy" decoding="async"
          alt="Narrowsburg’da Delaware Nehri kıyısındaki binaların hava fotoğrafı" />
        <motion.div className="compare-annotation" style={{ clipPath }} aria-hidden="true">
          <svg viewBox="0 0 1448 1086" preserveAspectRatio="none" focusable="false">
            {roofs.map(([outline, kind]) => <polygon key={outline} points={outline} className={kind} />)}
          </svg>
        </motion.div>
        <span className="compare-label compare-label--image">Görüntü</span>
        <span className="compare-label compare-label--mask">Örnek bina sınırları</span>
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
      <div className="frame-legend"><span><b aria-hidden="true"></b> Elle çizilmiş sınır</span><span><b className="dashed" aria-hidden="true"></b> Örnek inceleme işareti</span></div>
    </div>
  );
}
