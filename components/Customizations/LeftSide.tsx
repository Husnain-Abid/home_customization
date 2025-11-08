"use client"

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useProductContext } from '../../contexts/ProductContext';
import { useInteriorFeatures } from '../../hooks/useInteriorFeatures';
import { useExteriorFeatures } from '../../hooks/useExteriorFeatures';
import { useEnergySources } from '../../hooks/useEnergySources';
import { useFeatureUI } from '../../hooks/useFeatureUI';
import SidebarSkeleton from './SidebarSkeleton';
import InteriorFeatures from './CustomHomeFilter/InteriorFeatures';
import ExteriorFeatures from './CustomHomeFilter/ExteriorFeatures';
import EnergySources from './CustomHomeFilter/EnergySources';

export default function LeftSide() {
  const { productData } = useProductContext();
  const { hasAnySelections, resetAllSelections, getAccordionStyling, getIndicatorStyling } = useFeatureUI();

  // Get selection states for accordion styling
  const {
    isKitchenSelected,
    isKitchenNoSelected,
    isBathroomSelected,
    hasBathroomCustomizations,
  } = useInteriorFeatures();

  const { isFeatureSelected } = useExteriorFeatures();

  const { isFeatureSelected: isEnergyFeatureSelected } = useEnergySources();

  if (!productData) {
    return <SidebarSkeleton />;
  }

  // Check if interior features have selections
  const hasInteriorSelections = isKitchenSelected() || isKitchenNoSelected() || isBathroomSelected() || hasBathroomCustomizations();

  // Check if exterior features have selections
  const hasExteriorSelections = isFeatureSelected('stairs', 'yes') || isFeatureSelected('stairs', 'no') ||
    isFeatureSelected('railing', 'yes') || isFeatureSelected('railing', 'no');

  // Check if energy sources have selections
  const hasEnergySelections =
    isEnergyFeatureSelected('airConditioner', 'yes') || isEnergyFeatureSelected('airConditioner', 'no') ||
    isEnergyFeatureSelected('naturalGas', 'yes') || isEnergyFeatureSelected('naturalGas', 'no') ||
    isEnergyFeatureSelected('solarPanel', 'yes') || isEnergyFeatureSelected('solarPanel', 'no');

  return (
    <div className="p-4 h-full xl:h-screen overflow-y-auto bg-gray-100 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Feature Options
        </h2>
        {hasAnySelections() && (
          <button
            onClick={resetAllSelections}
            className="text-sm text-gray-600 font-semibold hover:text-gray-800 cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <Accordion type="single" defaultValue="interior" className="space-y-3 sm:space-y-4">
        {/* Interior Features */}
        <AccordionItem
          value="interior"
          className={getAccordionStyling(hasInteriorSelections)}
        >
          <AccordionTrigger className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-sm sm:text-base transition-colors duration-200 hover:text-blue-700">
            <span className="flex items-center gap-2">
              <span className={getIndicatorStyling(hasInteriorSelections, 'bg-blue-500')}></span>
              Interior Features
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 sm:px-4 pb-3 sm:pb-4">
            <InteriorFeatures />
          </AccordionContent>
        </AccordionItem>

        {/* Exterior Features */}
        <AccordionItem
          value="exterior"
          className={getAccordionStyling(hasExteriorSelections)}
        >
          <AccordionTrigger className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-sm sm:text-base transition-colors duration-200 hover:text-teal-700">
            <span className="flex items-center gap-2">
              <span className={getIndicatorStyling(hasExteriorSelections, 'bg-teal-500')}></span>
              Exterior Features
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 sm:px-4 pb-3 sm:pb-4">
            <ExteriorFeatures />
          </AccordionContent>
        </AccordionItem>

        {/* Energy Sources */}
        <AccordionItem
          value="energy"
          className={getAccordionStyling(hasEnergySelections)}
        >
          <AccordionTrigger className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-sm sm:text-base transition-colors duration-200 hover:text-amber-700">
            <span className="flex items-center gap-2">
              <span className={getIndicatorStyling(hasEnergySelections, 'bg-amber-500')}></span>
              Energy Sources
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 sm:px-4 pb-3 sm:pb-4">
            <EnergySources />
          </AccordionContent>
        </AccordionItem>


        
      </Accordion>
    </div>
  );
}
