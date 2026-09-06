import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { SwellScene } from '../scenes/SwellScene.jsx';

export default function SwellEntry(props) {
  return (
    <FamilyCanvas sceneId="swell-marshall">
      <SwellScene {...props} />
    </FamilyCanvas>
  );
}
