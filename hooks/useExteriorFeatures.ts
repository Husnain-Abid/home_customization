import { useProductContext } from '../contexts/ProductContext';

export const useExteriorFeatures = () => {
  const { selectedFeatures, handleFeatureChange, isFeatureSelected } = useProductContext();

  // Door features (mutually exclusive)
  const doorFeatures = ['slider_door', 'french_door'];

  /** ✅ Handle mutually exclusive door selection */
  const handleDoorChange = (selectedDoorType: string) => {
    // Reset both doors first
    doorFeatures.forEach(featureKey => {
      handleFeatureChange(featureKey, 'no');
    });

    // Then set the selected one to "yes"
    if (selectedDoorType === 'slider') {
      handleFeatureChange('slider_door', 'yes');
    } else if (selectedDoorType === 'french') {
      handleFeatureChange('french_door', 'yes');
    }
  };

  /** ✅ Get the currently selected door type */
  const getSelectedDoorType = () => {
    if (selectedFeatures.slider_door === 'yes') return 'slider';
    if (selectedFeatures.french_door === 'yes') return 'french';
    return null;
  };

  /** ✅ Toggle any feature with Yes↔No flipping (never empty) */
  const handleFeatureToggle = (featureKey: string, value: string) => {
    const currentValue = selectedFeatures[featureKey];

    // If same value clicked again → toggle to the opposite
    const toggledValue = currentValue === value ? (value === 'yes' ? 'no' : 'yes') : value;
    handleFeatureChange(featureKey, toggledValue);

    // 🚫 Railing should be "no" if stairs = "no"
    if (featureKey === 'stairs' && toggledValue === 'no') {
      handleFeatureChange('railing', 'no');
    }
  };

  return {
    selectedFeatures,
    isFeatureSelected,
    handleFeatureToggle,
    handleDoorChange,
    getSelectedDoorType,
  };
};
