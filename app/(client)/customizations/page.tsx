import ImageGallery from '@/components/Customizations/ImageGallery'
import LeftSide from '@/components/Customizations/LeftSide'
import MiddleSection from '@/components/Customizations/MiddleSection'
import RightSide from '@/components/Customizations/RightSide'
import SendCustomizedHome from '@/components/Customizations/SendCustomizedHome'
import React from 'react'

export default function CustomizationsPage() {
    return (
        <div className='px-4'>

            <div className='flex flex-col justify-center items-center max-w-3xl mx-auto mb-8 gap-4 px-4'>
                <h1 className='text-xl sm:text-2xl md:text-4xl font-bold text-center'>Customize Every Corner of <br /> Your Future Home</h1>
                <p className='text-gray-500 text-center'>We can build your home onsite within 2-3 weeks with no permit required for this location. We specialize in building homes in this area, so you can start customizing right away and have your home ready soon!</p>
            </div>

            <div className="min-h-screen  bg-[#E9E9EA80]/50 border-2 border-gray-300 rounded-lg max-w-7xl mx-auto  xl:px-4">
                {/* Mobile Layout - Stacked */}
                <div className="block lg:hidden">
                    <div className="space-y-4 px-2 py-4">
                        <div className="bg-white rounded-lg shadow-sm">
                            <LeftSide />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm">
                            <MiddleSection />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm">
                            <RightSide />
                        </div>
                    </div>
                </div>

                {/* Tablet Layout - 2 columns */}
                <div className="hidden lg:block xl:hidden">
                    <div className="grid grid-cols-2 gap-4 px-2 py-4 min-h-screen">
                        <div className="bg-white rounded-lg shadow-sm">
                            <LeftSide />
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white rounded-lg shadow-sm ">
                                <MiddleSection />
                            </div>
                            <div className="bg-white rounded-lg shadow-sm">
                                <RightSide />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout - 3 columns */}
                <div className="hidden xl:block">
                    <div className="flex max-w-7xl mx-auto min-h-screen px-2 py-4 rounded-lg">
                        <div className="w-1/4 ">
                            <LeftSide />
                        </div>
                        <div className="w-1/2 ">
                            <MiddleSection />
                        </div>
                        <div className="w-1/4 ">
                            <RightSide />
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-20  bg-[#E9E9EA80]/50'>
                <ImageGallery />
            </div>

            <div className='mt-20'>
                <SendCustomizedHome />
            </div>
            
        </div>
    )
}
