import { useEffect } from 'react';
import { useProductContext } from '../contexts/ProductContext';

export const useExteriorFeatures = () => {
  const { selectedFeatures, handleFeatureChange, isFeatureSelected } = useProductContext();

  // Door features (mutually exclusive)
  const doorFeatures = ['slider_door', 'french_door'];
  const isYes = (key: string) => selectedFeatures[key] === 'yes';
  const isNo = (key: string) => selectedFeatures[key] === 'no';


console.log("selectedFeatures",selectedFeatures);



  const isStairsYes = () => isYes('stairs');
  const isSolarYes = () => isYes('solarPanel');

  const isRailingDisabled = () => {
    return !isStairsYes() || isSolarYes();
  };

 // 🔥 HARD ENFORCEMENT (THIS FIXES YOUR BUG)
  useEffect(() => {
    if (isRailingDisabled() && selectedFeatures.railing !== 'no') {
      handleFeatureChange('railing', 'no');
    }
  }, [selectedFeatures.stairs, selectedFeatures.solarPanel]);

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
  const toggledValue =
    currentValue === value ? (value === 'yes' ? 'no' : 'yes') : value;

  handleFeatureChange(featureKey, toggledValue);

  // 🔒 HARD RULE: railing only allowed when stairs=yes AND solarPanel=no
  const nextStairs =
    featureKey === 'stairs' ? toggledValue : selectedFeatures.stairs;

  const nextSolar =
    featureKey === 'solarPanel' ? toggledValue : selectedFeatures.solarPanel;

  if (nextStairs !== 'yes' || nextSolar === 'yes') {
    handleFeatureChange('railing', 'no');
  }
};




  return {
    selectedFeatures,
    isFeatureSelected,
    handleFeatureToggle,
    handleDoorChange,
    getSelectedDoorType,
    isRailingDisabled,
  };



};