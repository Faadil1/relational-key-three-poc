import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { StereoscopyScene } from '../scenes/StereoscopyScene.jsx';

export default function StereoscopyEntry(props) {
  return (
    <FamilyCanvas sceneId="stereoscopy-uk">
      <StereoscopyScene {...props} />
    </FamilyCanvas>
  );
}
