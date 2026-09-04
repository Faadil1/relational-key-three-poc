import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { MusicBoxScene } from '../scenes/MusicBoxScene.jsx';

export default function MusicBoxEntry(props) {
  return (
    <FamilyCanvas sceneId="music-box-sainte-croix">
      <MusicBoxScene {...props} />
    </FamilyCanvas>
  );
}
