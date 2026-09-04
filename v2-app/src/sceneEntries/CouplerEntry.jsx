import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { CouplerScene } from '../scenes/CouplerScene.jsx';

export default function CouplerEntry(props) {
  return (
    <FamilyCanvas sceneId="coupler-virginia">
      <CouplerScene {...props} />
    </FamilyCanvas>
  );
}
