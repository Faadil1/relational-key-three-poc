import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { ZelligeScene } from '../scenes/ZelligeScene.jsx';

export default function ZelligeEntry(props) {
  return (
    <FamilyCanvas sceneId="zellige-fes">
      <ZelligeScene {...props} />
    </FamilyCanvas>
  );
}
