import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SidebarSkeleton() {
    return (
        <div className="p-4 h-screen overflow-y-auto shadow-sm bg-white rounded-lg">
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-32 mb-4 sm:mb-6" />

            <div className="space-y-3 sm:space-y-4">
                {/* Interior Features Section */}
                <div className="border rounded-lg">
                    <Skeleton className="h-12 w-full rounded-t-lg" />
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                        {/* Feature items */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="space-y-1 sm:space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <div className="space-y-1 sm:space-y-2 ml-2">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="flex items-center space-x-2">
                                            <Skeleton className="h-4 w-4" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Exterior Features Section */}
                <div className="border rounded-lg">
                    <Skeleton className="h-12 w-full rounded-t-lg" />
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                        {/* Door options */}
                        <div className="space-y-1 sm:space-y-2">
                            <Skeleton className="h-3 w-12" />
                            <div className="space-y-1 sm:space-y-2 ml-2">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <Skeleton className="h-4 w-4" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Other exterior features */}
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-1 sm:space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <div className="space-y-1 sm:space-y-2 ml-2">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="flex items-center space-x-2">
                                            <Skeleton className="h-4 w-4" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Energy Sources Section */}
                <div className="border rounded-lg">
                    <Skeleton className="h-12 w-full rounded-t-lg" />
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-1 sm:space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <div className="space-y-1 sm:space-y-2 ml-2">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="flex items-center space-x-2">
                                            <Skeleton className="h-4 w-4" />
                                            <Skeleton className="h-3 w-28" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 