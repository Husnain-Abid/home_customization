import { useProductContext } from '../contexts/ProductContext';

export const useEnergySources = () => {
  const { selectedFeatures, handleFeatureChange, isFeatureSelected } = useProductContext();

  /**
   * ✅ Feature toggle logic (always "yes" or "no")
   * - Never leaves any option empty
   * - Clicking "yes" again → toggles to "no"
   * - Clicking "no" again → toggles to "yes"
   */
  const handleFeatureToggle = (featureKey: string, value: string) => {
    const currentValue = selectedFeatures[featureKey];

    // If same value clicked again, toggle it
    if (currentValue === value) {
      const toggledValue = value === 'yes' ? 'no' : 'yes';
      handleFeatureChange(featureKey, toggledValue);
    } else {
      // Otherwise set to the clicked value
      handleFeatureChange(featureKey, value);
    }
  };

  return {
    selectedFeatures,
    isFeatureSelected,
    handleFeatureToggle,
  };
};
