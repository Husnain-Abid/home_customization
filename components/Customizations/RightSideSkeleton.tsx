import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function RightSideSkeleton() {
    return (
        <div className="p-4 h-full overflow-y-auto shadow-sm bg-white rounded-l">
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-48 mx-auto mb-4 sm:mb-6" />
            
            <div className="space-y-4 sm:space-y-6">
                {/* Configuration Item Skeleton */}
                <div className="bg-gray-100 border rounded-lg p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-5/6" />
                    </div>
                </div>

                {/* Cost Summary Skeleton */}
                <div className="space-y-2 sm:space-y-3">
                    {/* Base Home */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                    </div>

                    {/* Kitchen */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>

                    {/* Solar Panel */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16" />
                    </div>

                    {/* Total Estimate */}
                    <div className="border-t pt-2 sm:pt-3 mt-3 sm:mt-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 