import { useProductContext } from '../contexts/ProductContext';

export const useInteriorFeatures = () => {
  const { selectedFeatures, handleFeatureChange, isFeatureSelected } = useProductContext();

  // -----------------------
  // ✅ Helper Functions
  // -----------------------
  const isYes = (key: string) => selectedFeatures[key] === 'yes';
  const isNo = (key: string) => selectedFeatures[key] === 'no';

  const isKitchenSelected = () => isYes('kitchen');
  const isKitchenNoSelected = () => isNo('kitchen');
  const isBathroomSelected = () => isYes('bathroom');
  const isBathroomNoSelected = () => isNo('bathroom');
  const isKitchenWallSelected = () => isYes('kitchen_wall');
  const isShowerSelected = () => isYes('shower');

  const shouldShowKitchenPositionOptions = () => isKitchenSelected();

  // -----------------------
  // ✅ Core Handlers
  // -----------------------

  /** Toggle a main feature (Kitchen/Bathroom Yes/No) */
  const handleFeatureToggle = (featureKey: string, value: string) => {
    const currentValue = selectedFeatures[featureKey];
    const toggledValue = currentValue === value ? (value === 'yes' ? 'no' : 'yes') : value;

    handleFeatureChange(featureKey, toggledValue);

    // 🧹 Kitchen reset & default logic



    // 🛁 Bathroom logic — when Bathroom = No → all sub-features = "no"
    if (featureKey === 'bathroom') {
      if (toggledValue === 'no') {
        handleFeatureChange('shower', 'no');
        handleFeatureChange('sink', 'no');
        handleFeatureChange('toilet', 'no');
      } else {
        handleFeatureChange('shower', 'yes');
        handleFeatureChange('sink', 'yes');
        handleFeatureChange('toilet', 'yes');
      }
    }


    // 💡 NEW LOGIC:
    // If both Bathroom and Kitchen are "no" → set kitchen_wall = "no"
    const isBathroomNo =
      featureKey === 'bathroom' ? toggledValue === 'no' : selectedFeatures.bathroom === 'no';
    const isKitchenNo =
      featureKey === 'kitchen' ? toggledValue === 'no' : selectedFeatures.kitchen === 'no';

    if (isBathroomNo && isKitchenNo) {
      handleFeatureChange('kitchen_wall', 'no');
    }


    // 🍳 Auto-select Kitchen Position 1 when Kitchen = Yes and Bathroom = No
    const isKitchenYes =
      featureKey === 'kitchen' ? toggledValue === 'yes' : selectedFeatures.kitchen === 'yes';
    const isBathroomReallyNo =
      featureKey === 'bathroom' ? toggledValue === 'no' : selectedFeatures.bathroom === 'no';

    if (isKitchenYes && isBathroomReallyNo) {
      handleFeatureChange('kitchen_position', 'wall3'); // auto-select Position 1
    }

    // 🚫 NEW RULE: If Kitchen = No → clear kitchen_position
    if (featureKey === 'kitchen' && toggledValue === 'no') {
      handleFeatureChange('kitchen_position', 'no');
    }

    // 🚽 RULE: Cannot have toilet=yes without sink or kitchen
    const isSinkNo =
      featureKey === 'sink' ? toggledValue === 'no' : selectedFeatures.sink === 'no';
    const isKitchenReallyNo =
      featureKey === 'kitchen' ? toggledValue === 'no' : selectedFeatures.kitchen === 'no';

    // If both sink and kitchen are "no" → toilet must also be "no"
    if (isSinkNo && isKitchenReallyNo) {
      handleFeatureChange('toilet', 'no');
    }

    // 🚫 Do NOT reset bathroom sub-features anymore.
    // Just leave them as they are (to restore later if Bathroom becomes "Yes" again).
  };

  /** Handle kitchen position (Wall vs Other) */
  const handleKitchenPositionChange = (position: string) => {
    handleFeatureChange('kitchen_wall', '');
    handleFeatureChange('kitchen_position', '');
    if (position === 'wall') {
      handleFeatureChange('kitchen_wall', 'yes');
    } else {
      handleFeatureChange('kitchen_position', position);
    }
  };

  /** Toggle kitchen position (uncheck logic) */
  const handleKitchenPositionToggle = (position: string) => {
    const isWall = position === 'wall';
    const alreadySelected = isWall
      ? isYes('kitchen_wall')
      : selectedFeatures.kitchen_position === position;

    if (alreadySelected) {
      handleFeatureChange('kitchen_wall', '');
      handleFeatureChange('kitchen_position', '');
    } else {
      handleKitchenPositionChange(position);
    }
  };

  // -----------------------
  // ✅ Bathroom Logic
  // -----------------------

  /** Toggle individual bathroom sub-features with Yes↔No flip */
  const handleBathroomFeatureToggle = (key: string, value: string) => {
    // If Bathroom = No, disable sub-feature interaction
    if (isBathroomNoSelected()) return;

    const currentValue = selectedFeatures[key];
    const toggledValue = currentValue === value ? (value === 'yes' ? 'no' : 'yes') : value;

    handleFeatureChange(key, toggledValue);

    // 🚽 RULE: Toilet cannot be yes if both sink and kitchen are no
    const isSinkNo = key === 'sink' ? toggledValue === 'no' : selectedFeatures.sink === 'no';
    const isKitchenNo = selectedFeatures.kitchen === 'no';
    if (isSinkNo && isKitchenNo) {
      handleFeatureChange('toilet', 'no');
    }

  };

  /** Check if toilet should be disabled (no sink + no kitchen) */
  const isToiletDisabled = () => isNo('sink') && isNo('kitchen');

  /** Check if bathroom has any sub-customizations */
  const hasBathroomCustomizations = () =>
    ['shower', 'sink', 'toilet'].some((field) => !!selectedFeatures[field]);

  // -----------------------
  // ✅ Return API
  // -----------------------
  return {
    selectedFeatures,
    isFeatureSelected,

    // Checks
    isKitchenSelected,
    isKitchenNoSelected,
    isBathroomSelected,
    isBathroomNoSelected,
    isKitchenWallSelected,
    isShowerSelected,
    shouldShowKitchenPositionOptions,
    isToiletDisabled,

    // Handlers
    handleFeatureToggle,
    handleKitchenPositionToggle,
    handleBathroomFeatureToggle,
    hasBathroomCustomizations,
  };
};
