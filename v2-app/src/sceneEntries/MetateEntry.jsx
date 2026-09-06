import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { MetateScene } from '../scenes/MetateScene.jsx';

export default function MetateEntry(props) {
  return (
    <FamilyCanvas sceneId="metate-teotitlan">
      <MetateScene {...props} />
    </FamilyCanvas>
  );
}
