import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { AstrolabeScene } from '../scenes/AstrolabeScene.jsx';

export default function AstrolabeEntry(props) {
  return (
    <FamilyCanvas sceneId="astrolabe-isfahan">
      <AstrolabeScene {...props} />
    </FamilyCanvas>
  );
}
