import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { HikaAhiScene } from '../scenes/HikaAhiScene.jsx';

export default function HikaAhiEntry(props) {
  return (
    <FamilyCanvas sceneId="hika-ahi-aotearoa">
      <HikaAhiScene {...props} />
    </FamilyCanvas>
  );
}
