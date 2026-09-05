import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { ServiceBeninScene } from '../scenes/ServiceBeninScene.jsx';

export default function ServiceBeninEntry(props) {
  return (
    <FamilyCanvas sceneId="service-benin">
      <ServiceBeninScene {...props} />
    </FamilyCanvas>
  );
}
