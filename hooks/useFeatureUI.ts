import { useProductContext } from '../contexts/ProductContext';

export const useFeatureUI = () => {
  const { hasAnySelections, resetAllSelections } = useProductContext();

  // Helper function to get accordion styling based on selection state
  const getAccordionStyling = (hasSelections: boolean) => {
    return `!border border-gray-100 rounded-lg transition-all duration-200 ${
      hasSelections
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-md'
        : 'bg-white'
    }`;
  };

  // Helper function to get section styling based on selection state
  const getSectionStyling = (hasSelections: boolean, colorScheme: string) => {
    const baseClasses = 'flex flex-col space-y-1 sm:space-y-2 p-3 rounded-lg border transition-all duration-200';
    
    if (hasSelections) {
      return `${baseClasses} bg-gradient-to-r ${colorScheme} shadow-sm`;
    }
    
    return `${baseClasses} bg-gray-50 border-gray-200 hover:border-gray-300`;
  };

  // Helper function to get indicator dot styling
  const getIndicatorStyling = (hasSelections: boolean, color: string) => {
    return `w-2 h-2 rounded-full ${
      hasSelections ? `${color} animate-pulse` : 'bg-gray-300'
    }`;
  };

  // Helper function to get small indicator dot styling
  const getSmallIndicatorStyling = (hasSelections: boolean, color: string) => {
    return `w-1.5 h-1.5 rounded-full ${
      hasSelections ? color : 'bg-gray-400'
    }`;
  };

  return {
    hasAnySelections,
    resetAllSelections,
    getAccordionStyling,
    getSectionStyling,
    getIndicatorStyling,
    getSmallIndicatorStyling,
  };
};
