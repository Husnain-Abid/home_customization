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
        isRailingDisabled
    } = useExteriorFeatures();

    const { getSectionStyling, getSmallIndicatorStyling } = useFeatureUI();


console.log("isRailingDisabled:", isRailingDisabled());


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


            {/* Railing Section - Enabled only when Stairs = Yes and disabled when Solar = Yes */}




            {!isRailingDisabled() ? (
                <div className={getSectionStyling(
                    isFeatureSelected('railing', 'yes') || isFeatureSelected('railing', 'no'),
                    'from-lime-50 to-green-50 border-lime-300'
                )}>
                    <span className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                        <span className={getSmallIndicatorStyling(
                            isFeatureSelected('railing', 'yes') || isFeatureSelected('railing', 'no'),
                            'bg-lime-500'
                        )}></span>
                        Roof Railing:
                    </span>

                    <div className="flex flex-col space-y-1 sm:space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={isFeatureSelected('railing', 'yes')}
                                onCheckedChange={() => handleFeatureToggle('railing', 'yes')}
                            />
                            <label className="text-xs sm:text-sm text-gray-600">Yes</label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={isFeatureSelected('railing', 'no')}
                                onCheckedChange={() => handleFeatureToggle('railing', 'no')}
                            />
                            <label className="text-xs sm:text-sm text-gray-600">No</label>
                        </div>
                    </div>
                </div>

            ) : (
                // ⚠️ Disabled state — "No" visibly selected

                <div className="flex flex-col space-y-1 sm:space-y-2 p-3 rounded-lg border transition-all duration-200 bg-gradient-to-r from-lime-50 to-green-50 border-lime-300 shadow-sm opacity-60">
                    <span className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />Roof Railing:</span>
                    <div className="flex flex-col space-y-1 sm:space-y-2">
                        <div className="flex items-center space-x-2">
                            <button type="button" role="checkbox" aria-checked="false" data-state="unchecked" data-disabled disabled value="on" data-slot="checkbox"
                                className="peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 scale-90 sm:scale-100 cursor-not-allowed" id="railing-yes" />
                            <label htmlFor="railing-yes" className="text-xs sm:text-sm text-gray-400 cursor-not-allowed">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2"><button type="button" role="checkbox" aria-checked="true" data-state="checked" data-disabled disabled value="on" data-slot="checkbox" className="peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 scale-90 sm:scale-100 cursor-not-allowed" id="railing-no">
                            <span data-state="checked" data-disabled data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none" style={{ pointerEvents: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check size-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                            </span>
                        </button>
                            <label htmlFor="railing-no" className="text-xs sm:text-sm text-gray-400 cursor-not-allowed">No</label>
                        </div>
                    </div>
                </div>

            )}







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
