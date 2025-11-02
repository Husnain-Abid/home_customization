import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useInteriorFeatures } from '../../../hooks/useInteriorFeatures';
import { useFeatureUI } from '../../../hooks/useFeatureUI';

export default function InteriorFeatures() {
  const {
    selectedFeatures,
    isFeatureSelected,
    isKitchenSelected,
    isKitchenNoSelected,
    isBathroomSelected,
    isBathroomNoSelected,
    isShowerSelected,
    shouldShowKitchenPositionOptions,
    handleFeatureToggle,
    handleKitchenPositionToggle,
    handleBathroomFeatureToggle,
    hasBathroomCustomizations,
  } = useInteriorFeatures();

  const { getSectionStyling, getSmallIndicatorStyling } = useFeatureUI();

  return (
    <div className="space-y-2 sm:space-y-3">

      {/* Kitchen Section */}
      <div className={getSectionStyling(
        isKitchenSelected() || isKitchenNoSelected(),
        'from-green-50 to-emerald-50 border-green-300'
      )}>
        <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
          <span className={getSmallIndicatorStyling(
            isKitchenSelected() || isKitchenNoSelected(),
            'bg-green-500'
          )}></span>
          Kitchen:
        </span>
        <div className="flex flex-col space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2 p-2 rounded transition-all duration-150">
            <Checkbox
              id="kitchen-yes"
              checked={isFeatureSelected('kitchen', 'yes')}
              onCheckedChange={() => handleFeatureToggle('kitchen', 'yes')}
              className="scale-90 cursor-pointer sm:scale-100"
            />
            <label htmlFor="kitchen-yes" className="text-xs sm:text-sm cursor-pointer text-gray-600">
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded transition-all duration-150">
            <Checkbox
              id="kitchen-no"
              checked={isFeatureSelected('kitchen', 'no')}
              onCheckedChange={() => handleFeatureToggle('kitchen', 'no')}
              className="scale-90 cursor-pointer sm:scale-100"
            />
            <label htmlFor="kitchen-no" className="text-xs sm:text-sm cursor-pointer text-gray-600">
              No
            </label>
          </div>
        </div>
      </div>

      {/* Kitchen Wall Section - Only show if Kitchen = No */}
      {isKitchenNoSelected() && isBathroomSelected() && (
        <div className={getSectionStyling(
          isFeatureSelected('kitchen_wall', 'yes') || isFeatureSelected('kitchen_wall', 'no'),
          'from-orange-50 to-amber-50 border-orange-300'
        )}>
          <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
            <span className={getSmallIndicatorStyling(
              isFeatureSelected('kitchen_wall', 'yes') || isFeatureSelected('kitchen_wall', 'no'),
              'bg-orange-500'
            )}></span>
            Kitchen Wall:
          </span>
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kitchen_wall-yes"
                checked={isFeatureSelected('kitchen_wall', 'yes')}
                onCheckedChange={() => handleFeatureToggle('kitchen_wall', 'yes')}
                className="scale-90 cursor-pointer sm:scale-100"
              />
              <label htmlFor="kitchen_wall-yes" className="text-xs sm:text-sm text-gray-600">
                Yes
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kitchen_wall-no"
                checked={isFeatureSelected('kitchen_wall', 'no')}
                onCheckedChange={() => handleFeatureToggle('kitchen_wall', 'no')}
                className="scale-90 cursor-pointer sm:scale-100"
              />
              <label htmlFor="kitchen_wall-no" className="text-xs sm:text-sm text-gray-600">
                No
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Kitchen Position Options - Only show if Kitchen = Yes and when bathroom yes it should be disable */}
      {shouldShowKitchenPositionOptions() && !isBathroomSelected() && (

        <div className="bg-gray-50 p-3 rounded-lg">
          <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] block mb-2">
            Kitchen Position:
          </span>
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kitchen-position-3"
                checked={selectedFeatures.kitchen_position === 'wall3'}
                onCheckedChange={() => handleKitchenPositionToggle('wall3')}
                className="scale-90 cursor-pointer sm:scale-100"
              />
              <label htmlFor="kitchen-position-3" className="text-xs sm:text-sm text-gray-600">
                Position 1
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kitchen-position-4"
                checked={selectedFeatures.kitchen_position === 'wall4'}
                onCheckedChange={() => handleKitchenPositionToggle('wall4')}
                className="scale-90 cursor-pointer sm:scale-100"
              />
              <label htmlFor="kitchen-position-4" className="text-xs sm:text-sm text-gray-600">
                Position 2
              </label>
            </div>
          </div>
        </div>

      )}

      {/*Kitchen Position Options - show this warning when bathroom yes */}
      {isKitchenSelected() && isBathroomSelected() && (

        <div className="p-3 rounded-lg border transition-all duration-200 opacity-50 pointer-events-none bg-gray-100 border-gray-200">
          <span className="text-xs sm:text-sm font-semibold block mb-2 text-gray-400">
            Kitchen Position:
          </span>
          <div className="mb-3 p-2 bg-gray-50 rounded border border-gray-200">
            <p className="text-xs text-gray-600 italic">
              ⚠️ Kitchen position is disabled when bathroom is selected
            </p>
          </div>
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                data-disabled=""
                value="on"
                data-slot="checkbox"
                className="peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 scale-90 sm:scale-100 cursor-not-allowed"
                id="kitchen-position-3"
              />
              <label
                htmlFor="kitchen-position-3"
                className="text-xs sm:text-sm text-gray-400 cursor-not-allowed"
              >
                Position 1
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                data-disabled=""
                value="on"
                data-slot="checkbox"
                className="peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 scale-90 sm:scale-100 cursor-not-allowed"
                id="kitchen-position-4"
              />
              <label
                htmlFor="kitchen-position-4"
                className="text-xs sm:text-sm text-gray-400 cursor-not-allowed"
              >
                Position 2
              </label>
            </div>
          </div>
        </div>
      )}


      {/* Bathroom Section */}
      <div className={getSectionStyling(
        isBathroomSelected() || isFeatureSelected('bathroom', 'no') || hasBathroomCustomizations(),
        'from-purple-50 to-violet-50 border-purple-300'
      )}>
        <span className="text-xs sm:text-sm font-semibold text-[#4A4C56] flex items-center gap-2">
          <span className={getSmallIndicatorStyling(
            isBathroomSelected() || isFeatureSelected('bathroom', 'no') || hasBathroomCustomizations(),
            'bg-purple-500'
          )}></span>
          Bathroom:
        </span>
        <div className="flex flex-col space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom-yes"
              checked={isFeatureSelected('bathroom', 'yes')}
              onCheckedChange={() => handleFeatureToggle('bathroom', 'yes')}
              className="scale-90 cursor-pointer sm:scale-100"
            />
            <label htmlFor="bathroom-yes" className="text-xs sm:text-sm text-gray-600">
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom-no"
              checked={isFeatureSelected('bathroom', 'no')}
              onCheckedChange={() => handleFeatureToggle('bathroom', 'no')}
              className="scale-90 cursor-pointer sm:scale-100"
            />
            <label htmlFor="bathroom-no" className="text-xs sm:text-sm text-gray-600">
              No
            </label>
          </div>
        </div>
      </div>

      {/* Bathroom Sub-features - Always visible */}
      <div className={`bg-gray-50 p-3 rounded-lg ${isBathroomNoSelected() ? 'bg-gray-100' : ''}`}>
        <span className={`text-xs sm:text-sm font-semibold block mb-2 ${isBathroomNoSelected() ? 'text-gray-400' : 'text-[#4A4C56]'}`}>
          Bathroom Customizations:
        </span>

        {/* Shower */}
        <div className={`flex flex-col space-y-1 sm:space-y-2 mb-3 p-3 rounded-lg border transition-all duration-200 ${
          isBathroomNoSelected() 
            ? 'opacity-50 pointer-events-none bg-gray-100 border-gray-200' 
            : (isFeatureSelected('shower', 'yes') || isFeatureSelected('shower', 'no')) 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-sm' 
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        }`}>
          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-2 ${isBathroomNoSelected() ? 'text-gray-400' : 'text-[#4A4C56]'}`}>
            <span className={getSmallIndicatorStyling(
              isBathroomNoSelected() ? false : (isFeatureSelected('shower', 'yes') || isFeatureSelected('shower', 'no')),
              'bg-blue-500'
            )}></span>
            Shower:
          </span>
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="shower-yes"
                checked={isFeatureSelected('shower', 'yes')}
                onCheckedChange={() => handleBathroomFeatureToggle('shower', 'yes')}
                className={`scale-90 sm:scale-100 ${isBathroomNoSelected() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isBathroomNoSelected()}
              />
              <label
                htmlFor="shower-yes"
                className={`text-xs sm:text-sm ${isBathroomNoSelected() ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}
              >
                Yes
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="shower-no"
                checked={isFeatureSelected('shower', 'no')}
                onCheckedChange={() => handleBathroomFeatureToggle('shower', 'no')}
                className={`scale-90 sm:scale-100 ${isBathroomNoSelected() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isBathroomNoSelected()}
              />
              <label
                htmlFor="shower-no"
                className={`text-xs sm:text-sm ${isBathroomNoSelected() ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}
              >
                No
              </label>
            </div>
          </div>
        </div>

        {/* Sink */}
        <div className={`flex flex-col space-y-1 sm:space-y-2 mb-3 p-3 rounded-lg border transition-all duration-200 ${
          isBathroomNoSelected() 
            ? 'opacity-50 pointer-events-none bg-gray-100 border-gray-200' 
            : (isFeatureSelected('sink', 'yes') || isFeatureSelected('sink', 'no')) 
              ? 'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-300 shadow-sm' 
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        }`}>
          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-2 ${isBathroomNoSelected() ? 'text-gray-400' : 'text-[#4A4C56]'}`}>
            <span className={getSmallIndicatorStyling(
              isBathroomNoSelected() ? false : (isFeatureSelected('sink', 'yes') || isFeatureSelected('sink', 'no')),
              'bg-purple-500'
            )}></span>
            Sink:
          </span>
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sink-yes"
                checked={isFeatureSelected('sink', 'yes')}
                onCheckedChange={() => handleBathroomFeatureToggle('sink', 'yes')}
                className={`scale-90 sm:scale-100 ${isBathroomNoSelected() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isBathroomNoSelected()}
              />
              <label
                htmlFor="sink-yes"
                className={`text-xs sm:text-sm ${isBathroomNoSelected() ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}
              >
                Yes
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sink-no"
                checked={isFeatureSelected('sink', 'no')}
                onCheckedChange={() => handleBathroomFeatureToggle('sink', 'no')}
                className={`scale-90 sm:scale-100 ${isBathroomNoSelected() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isBathroomNoSelected()}
              />
              <label
                htmlFor="sink-no"
                className={`text-xs sm:text-sm ${isBathroomNoSelected() ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}
              >
                No
              </label>
            </div>
          </div>
        </div>

        {/* Toilet */}
        <div className={`flex flex-col space-y-1 sm:space-y-2 p-3 rounded-lg border transition-all duration-200 ${
          isBathroomNoSelected() 
            ? 'opacity-50 pointer-events-none bg-gray-100 border-gray-200' 
            : (isFeatureSelected('toilet', 'yes') || isFeatureSelected('toilet', 'no')) 
              ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-300 shadow-sm' 
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        }`}>
          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-2 ${isBathroomNoSelected() ? 'text-gray-400' : 'text-[#4A4C56]'}`}>
            <span className={getSmallIndicatorStyling(
              isBathroomNoSelected() ? false : (isFeatureSelected('toilet', 'yes') || isFeatureSelected('toilet', 'no')),
              'bg-teal-500'
            )}></span>
            Toilet:
          </span>
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="toilet-yes"
                checked={isFeatureSelected('toilet', 'yes')}
                onCheckedChange={() => handleBathroomFeatureToggle('toilet', 'yes')}
                className={`scale-90 sm:scale-100 ${isBathroomNoSelected() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isBathroomNoSelected()}
              />
              <label
                htmlFor="toilet-yes"
                className={`text-xs sm:text-sm ${isBathroomNoSelected() ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}
              >
                Yes
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="toilet-no"
                checked={isFeatureSelected('toilet', 'no')}
                onCheckedChange={() => handleBathroomFeatureToggle('toilet', 'no')}
                className={`scale-90 sm:scale-100 ${isBathroomNoSelected() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isBathroomNoSelected()}
              />
              <label
                htmlFor="toilet-no"
                className={`text-xs sm:text-sm ${isBathroomNoSelected() ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}
              >
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
