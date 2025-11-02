import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MiddleSectionSkeleton() {
    return (
        <div className="px-4 py-4 xl:py-0 h-full overflow-y-auto">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Exterior Design Section Skeleton */}
                <div className="px-4 sm:px-6">
                    <Skeleton className="h-6 w-40 mb-3 sm:mb-4" />
                    <div className="relative">
                        <div className="overflow-hidden rounded-lg">
                            <div className="flex">
                                {/* Image skeleton */}
                                <div className="flex-[0_0_100%] min-w-0">
                                    <Skeleton className="aspect-video w-full rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons Skeleton */}
                        <Skeleton className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                        <Skeleton className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                    </div>
                </div>

                {/* Interior Design Section Skeleton */}
                <div className="p-4 sm:p-6">
                    <Skeleton className="h-6 w-40 mb-3 sm:mb-4" />
                    <div className="relative">
                        <div className="overflow-hidden rounded-lg">
                            <div className="flex">
                                {/* Image skeleton */}
                                <div className="flex-[0_0_100%] min-w-0">
                                    <Skeleton className="aspect-video w-full rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons Skeleton */}
                        <Skeleton className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                        <Skeleton className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
} 