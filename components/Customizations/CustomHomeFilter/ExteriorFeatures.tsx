import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useExteriorFeatures } from '../../../hooks/useExteriorFeatures';
import { useFeatureUI } from '../../../hooks/useFeatureUI';

export default function ExteriorFeatures() {
    const {
        selectedFeatures,
        isFeatureSelected,
        handleFeatureToggle,
        handleDoorChange,
        getSelectedDoorType,
    } = useExteriorFeatures();

    const { getSectionStyling, getSmallIndicatorStyling } = useFeatureUI();

    return (
        <div className="space-y-2 sm:space-y-3">
            {/* Stairs Section */}
            <div className={getSectionStyling(
                isFeatureSelected('stairs', 'yes') || isFeatureSelected('stairs', 'no'),
                'from-emerald-50 to-green-50 border-emerald-300'
            )}>
                <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
                    <span className={getSmallIndicatorStyling(
                        isFeatureSelected('stairs', 'yes') || isFeatureSelected('stairs', 'no'),
                        'bg-emerald-500'
                    )}></span>
                    Stairs:
                </span>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="stairs-yes"
                            checked={isFeatureSelected('stairs', 'yes')}
                            onCheckedChange={() => handleFeatureToggle('stairs', 'yes')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="stairs-yes" className="text-xs sm:text-sm text-gray-600">
                            Yes
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="stairs-no"
                            checked={isFeatureSelected('stairs', 'no')}
                            onCheckedChange={() => handleFeatureToggle('stairs', 'no')}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="stairs-no" className="text-xs sm:text-sm text-gray-600">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {/* Railing Section - Only enabled when Stairs = Yes and Railing disabled when Solar = Yes */}
            {/* <div className={`flex flex-col space-y-1 sm:space-y-2 p-3 rounded-lg border transition-all duration-200 ${(isFeatureSelected('railing', 'yes') || isFeatureSelected('railing', 'no'))
                    ? 'bg-gradient-to-r from-lime-50 to-green-50 border-lime-300 shadow-sm'
                    : isFeatureSelected('stairs', 'yes')
                        ? 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        : 'bg-gray-100 border-gray-200'
                } ${!isFeatureSelected('stairs', 'yes') ? 'opacity-60' : ''}`}>
                <span className={`text-xs sm:text-sm font-semibold flex items-center gap-2 ${isFeatureSelected('stairs', 'yes') ? 'text-[#4A4C56]' : 'text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${(isFeatureSelected('railing', 'yes') || isFeatureSelected('railing', 'no'))
                            ? 'bg-lime-500'
                            : isFeatureSelected('stairs', 'yes')
                                ? 'bg-gray-400'
                                : 'bg-gray-300'
                        }`}></span>
                    Railing:
                </span>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="railing-yes"
                            checked={isFeatureSelected('railing', 'yes')}
                            onCheckedChange={() => handleFeatureToggle('railing', 'yes')}
                            className={`scale-90 sm:scale-100 ${isFeatureSelected('stairs', 'yes') ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            disabled={!isFeatureSelected('stairs', 'yes')}
                        />
                        <label
                            htmlFor="railing-yes"
                            className={`text-xs sm:text-sm ${isFeatureSelected('stairs', 'yes') ? 'text-gray-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        >
                            Yes
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="railing-no"
                            checked={isFeatureSelected('railing', 'no')}
                            onCheckedChange={() => handleFeatureToggle('railing', 'no')}
                            className={`scale-90 sm:scale-100 ${isFeatureSelected('stairs', 'yes') ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            disabled={!isFeatureSelected('stairs', 'yes')}
                        />
                        <label
                            htmlFor="railing-no"
                            className={`text-xs sm:text-sm ${isFeatureSelected('stairs', 'yes') ? 'text-gray-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        >
                            No
                        </label>
                    </div>
                </div>
            </div> */}

            {/* Railing Section - Enabled only when Stairs = Yes and disabled when Solar = Yes */}
            <div
                className={`flex flex-col space-y-1 sm:space-y-2 p-3 rounded-lg border transition-all duration-200 ${(isFeatureSelected('railing', 'yes') || isFeatureSelected('railing', 'no'))
                        ? 'bg-gradient-to-r from-lime-50 to-green-50 border-lime-300 shadow-sm'
                        : isFeatureSelected('stairs', 'yes') && !isFeatureSelected('solar', 'yes')
                            ? 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            : 'bg-gray-100 border-gray-200'
                    } ${!isFeatureSelected('stairs', 'yes') || isFeatureSelected('solarPanel', 'yes')
                        ? 'opacity-60'
                        : ''
                    }`}
            >
                <span
                    className={`text-xs sm:text-sm font-semibold flex items-center gap-2 ${isFeatureSelected('stairs', 'yes') && !isFeatureSelected('solarPanel', 'yes')
                            ? 'text-[#4A4C56]'
                            : 'text-gray-400'
                        }`}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${(isFeatureSelected('railing', 'yes') || isFeatureSelected('railing', 'no'))
                                ? 'bg-lime-500'
                                : isFeatureSelected('stairs', 'yes') && !isFeatureSelected('solar', 'yes')
                                    ? 'bg-gray-400'
                                    : 'bg-gray-300'
                            }`}
                    ></span>
                    Railing:
                </span>

                <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="railing-yes"
                            checked={isFeatureSelected('railing', 'yes')}
                            onCheckedChange={() => handleFeatureToggle('railing', 'yes')}
                            className={`scale-90 sm:scale-100 ${isFeatureSelected('stairs', 'yes') && !isFeatureSelected('solar', 'yes')
                                    ? 'cursor-pointer'
                                    : 'cursor-not-allowed'
                                }`}
                            disabled={!isFeatureSelected('stairs', 'yes') || isFeatureSelected('solar', 'yes')}
                        />
                        <label
                            htmlFor="railing-yes"
                            className={`text-xs sm:text-sm ${isFeatureSelected('stairs', 'yes') && !isFeatureSelected('solarPanel', 'yes')
                                    ? 'text-gray-600 cursor-pointer'
                                    : 'text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Yes
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="railing-no"
                            checked={isFeatureSelected('railing', 'no')}
                            onCheckedChange={() => handleFeatureToggle('railing', 'no')}
                            className={`scale-90 sm:scale-100 ${isFeatureSelected('stairs', 'yes') && !isFeatureSelected('solarPanel', 'yes')
                                    ? 'cursor-pointer'
                                    : 'cursor-not-allowed'
                                }`}
                            disabled={!isFeatureSelected('stairs', 'yes') || isFeatureSelected('solarPanel', 'yes')}
                        />
                        <label
                            htmlFor="railing-no"
                            className={`text-xs sm:text-sm ${isFeatureSelected('stairs', 'yes') && !isFeatureSelected('solarPanel', 'yes')
                                    ? 'text-gray-600 cursor-pointer'
                                    : 'text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            No
                        </label>
                    </div>
                </div>
            </div>




            {/* Door Type Section */}
            <div className="flex flex-col space-y-1 sm:space-y-2 p-3 rounded-lg border transition-all duration-200 bg-gray-50 border-gray-200 hover:border-gray-300">
                <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Door:
                </span>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="slider-door"
                            checked={getSelectedDoorType() === 'slider'}
                            onCheckedChange={() => {
                                if (getSelectedDoorType() === 'slider') {
                                    // Uncheck slider door
                                    handleFeatureToggle('slider_door', '');
                                } else {
                                    handleDoorChange('slider');
                                }
                            }}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="slider-door" className="text-xs sm:text-sm text-gray-600">
                            Slider
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="french-door"
                            checked={getSelectedDoorType() === 'french'}
                            onCheckedChange={() => {
                                if (getSelectedDoorType() === 'french') {
                                    // Uncheck french door
                                    handleFeatureToggle('french_door', '');
                                } else {
                                    handleDoorChange('french');
                                }
                            }}
                            className="scale-90 cursor-pointer sm:scale-100"
                        />
                        <label htmlFor="french-door" className="text-xs sm:text-sm text-gray-600">
                            French Door
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
