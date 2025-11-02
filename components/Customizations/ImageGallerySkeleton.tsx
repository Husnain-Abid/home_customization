import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageGallerySkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-2 py-4">
            {/* Title Skeleton */}
            <Skeleton className="h-10 w-32 mx-auto mb-12" />
            
            {/* Gallery Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Interior Section Skeleton - Left Side */}
                <div className="space-y-6">
                    <Skeleton className="h-7 w-24 mx-auto mb-6" />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                                <Skeleton className="aspect-[4/3] w-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Exterior Section Skeleton - Right Side */}
                <div className="space-y-6">
                    <Skeleton className="h-7 w-24 mx-auto mb-6" />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                                <Skeleton className="aspect-[4/3] w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Responsive Mobile Layout Skeleton */}
            <div className="lg:hidden mt-8">
                <div className="space-y-8">
                    {/* Interior Section Mobile Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-20 mx-auto" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                                    <Skeleton className="aspect-[4/3] w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exterior Section Mobile Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-20 mx-auto" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                                    <Skeleton className="aspect-[4/3] w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 