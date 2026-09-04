import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { AnamorphosisScene } from '../scenes/AnamorphosisScene.jsx';

export default function AnamorphosisEntry(props) {
  return (
    <FamilyCanvas sceneId="anamorphosis-paris">
      <AnamorphosisScene {...props} />
    </FamilyCanvas>
  );
}
