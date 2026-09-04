import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { SignalScene } from '../scenes/SignalScene.jsx';

export default function SignalEntry(props) {
  return (
    <FamilyCanvas sceneId="signal-nigeria">
      <SignalScene {...props} />
    </FamilyCanvas>
  );
}
