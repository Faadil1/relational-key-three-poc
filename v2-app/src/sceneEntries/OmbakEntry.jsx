import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { OmbakScene } from '../scenes/OmbakScene.jsx';

export default function OmbakEntry(props) {
  return (
    <FamilyCanvas sceneId="ombak-bali">
      <OmbakScene {...props} />
    </FamilyCanvas>
  );
}
