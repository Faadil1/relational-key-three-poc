import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { KhipuScene } from '../scenes/KhipuScene.jsx';

export default function KhipuEntry(props) {
  return (
    <FamilyCanvas sceneId="khipu-peru">
      <KhipuScene {...props} />
    </FamilyCanvas>
  );
}
