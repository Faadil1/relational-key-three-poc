import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { KentoScene } from '../scenes/KentoScene.jsx';

export default function KentoEntry(props) {
  return (
    <FamilyCanvas sceneId="kento-japan">
      <KentoScene {...props} />
    </FamilyCanvas>
  );
}
