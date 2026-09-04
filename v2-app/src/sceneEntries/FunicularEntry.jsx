import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { FunicularScene } from '../scenes/FunicularScene.jsx';

export default function FunicularEntry(props) {
  return (
    <FamilyCanvas sceneId="funicular-valparaiso">
      <FunicularScene {...props} />
    </FamilyCanvas>
  );
}
