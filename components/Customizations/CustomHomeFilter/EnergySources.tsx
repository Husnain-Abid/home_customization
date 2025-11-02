import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useEnergySources } from '../../../hooks/useEnergySources';
import { useFeatureUI } from '../../../hooks/useFeatureUI';

export default function EnergySources() {
    const {
        selectedFeatures,
        isFeatureSelected,
        handleFeatureToggle,
    } = useEnergySources();

    const { getSectionStyling, getSmallIndicatorStyling } = useFeatureUI();

    return (
        <div className="space-y-2 sm:space-y-3">
            {/* Air Conditioner Section */}
            <div className={getSectionStyling(
                isFeatureSelected('airConditioner', 'yes') || isFeatureSelected('airConditioner', 'no'),
                'from-sky-50 to-blue-50 border-sky-300'
            )}>
                <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
                    <span className={getSmallIndicatorStyling(
                        isFeatureSelected('airConditioner', 'yes') || isFeatureSelected('airConditioner', 'no'),
                        'bg-sky-500'
                    )}></span>
                    Air Conditioner:
                </span>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="airConditioner-yes"
                            checked={isFeatureSelected('airConditioner', 'yes')}
                            onCheckedChange={() => handleFeatureToggle('airConditioner', 'yes')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="airConditioner-yes" className="text-xs sm:text-sm text-gray-600">
                            Yes
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="airConditioner-no"
                            checked={isFeatureSelected('airConditioner', 'no')}
                            onCheckedChange={() => handleFeatureToggle('airConditioner', 'no')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="airConditioner-no" className="text-xs sm:text-sm text-gray-600">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {/* Natural Gas Section */}
            <div className={getSectionStyling(
                isFeatureSelected('naturalGas', 'yes') || isFeatureSelected('naturalGas', 'no'),
                'from-emerald-50 to-green-50 border-emerald-300'
            )}>
                <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
                    <span className={getSmallIndicatorStyling(
                        isFeatureSelected('naturalGas', 'yes') || isFeatureSelected('naturalGas', 'no'),
                        'bg-emerald-500'
                    )}></span>
                    Natural Gas:
                </span>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="naturalGas-yes"
                            checked={isFeatureSelected('naturalGas', 'yes')}
                            onCheckedChange={() => handleFeatureToggle('naturalGas', 'yes')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="naturalGas-yes" className="text-xs sm:text-sm text-gray-600">
                            Yes
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="naturalGas-no"
                            checked={isFeatureSelected('naturalGas', 'no')}
                            onCheckedChange={() => handleFeatureToggle('naturalGas', 'no')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="naturalGas-no" className="text-xs sm:text-sm text-gray-600">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {/* Solar Panel Section */}
            <div className={getSectionStyling(
                isFeatureSelected('solarPanel', 'yes') || isFeatureSelected('solarPanel', 'no'),
                'from-amber-50 to-orange-50 border-amber-300'
            )}>
                <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
                    <span className={getSmallIndicatorStyling(
                        isFeatureSelected('solarPanel', 'yes') || isFeatureSelected('solarPanel', 'no'),
                        'bg-amber-500'
                    )}></span>
                    Solar Panel:
                </span>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="solarPanel-yes"
                            checked={isFeatureSelected('solarPanel', 'yes')}
                            onCheckedChange={() => handleFeatureToggle('solarPanel', 'yes')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="solarPanel-yes" className="text-xs sm:text-sm text-gray-600">
                            Yes
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="solarPanel-no"
                            checked={isFeatureSelected('solarPanel', 'no')}
                            onCheckedChange={() => handleFeatureToggle('solarPanel', 'no')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="solarPanel-no" className="text-xs sm:text-sm text-gray-600">
                            No
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
