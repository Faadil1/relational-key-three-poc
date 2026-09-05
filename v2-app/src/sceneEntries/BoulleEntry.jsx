import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { BoulleScene } from '../scenes/BoulleScene.jsx';

export default function BoulleEntry(props) {
  return (
    <FamilyCanvas sceneId="boulle-france">
      <BoulleScene {...props} />
    </FamilyCanvas>
  );
}
