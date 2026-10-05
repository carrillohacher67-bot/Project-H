import { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import OverlayPanel from '@/components/OverlayPanel';

export type PanelConfig = {
  longLines: boolean;
  precisionGuides: boolean;
  doubleBounceLines: boolean;
  impactPoint: boolean;
  angleRuler: boolean;
  opacity: number;
  lineColor: string;
};

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [config, setConfig] = useState<PanelConfig>({
    longLines: true,
    precisionGuides: false,
    doubleBounceLines: false,
    impactPoint: false,
    angleRuler: false,
    opacity: 85,
    lineColor: '#22d3ee',
  });

  if (!unlocked) {
    return <LoginScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <OverlayPanel
      config={config}
      setConfig={setConfig}
      onLock={() => setUnlocked(false)}
    />
  );
}
