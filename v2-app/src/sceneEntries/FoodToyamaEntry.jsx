import { FamilyCanvas } from '../FamilyCanvas.jsx';
import { FoodToyamaScene } from '../scenes/FoodToyamaScene.jsx';

export default function FoodToyamaEntry(props) {
  return (
    <FamilyCanvas sceneId="food-toyama">
      <FoodToyamaScene {...props} />
    </FamilyCanvas>
  );
}
