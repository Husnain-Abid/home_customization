"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useProductContext } from '@/contexts/ProductContext'
import { generateCustomizedHomePDF } from '@/lib/pdf-generator'
import { apiService, blobToBase64, createFormData } from '@/lib/api-config'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface FormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
    acceptPolicy: boolean
}

export default function SendCustomizedHome() {
    const router = useRouter()

    const {
        productData,
        selectedFeatures,
        filteredInteriorData,
        filteredExteriorEnergyData,
        totalPrice,

    } = useProductContext()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        reset
    } = useForm<FormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
            acceptPolicy: false
        }
    })

    // Add loading state for longer loading time
    const [isLoading, setIsLoading] = React.useState(false)
    // Show validation banner only after user clicks submit
    const [showNoCustomizationError, setShowNoCustomizationError] = React.useState(false)

    // Check if any customizations were actually selected
    const hasAnyCustomizations = () => {
        return (
            selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            selectedFeatures.slider_door === 'yes' ||
            selectedFeatures.french_door === 'yes' ||
            selectedFeatures.stairs === 'yes' ||
            selectedFeatures.roofTop === 'yes' ||
            selectedFeatures.airConditioner === 'yes' ||
            selectedFeatures.naturalGas === 'yes' ||
            selectedFeatures.solarPanel === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '')
        )
    }

    const onSubmit = async (data: FormData) => {
        try {
            // Check if any customizations were selected
            if (!hasAnyCustomizations()) {
                setShowNoCustomizationError(true)
                toast.error('Please select at least one customization before submitting.');
                return;
            }

            // Start loading state
            setIsLoading(true)

            // Generate PDF (no download)
            const config = {
                productData,
                selectedFeatures,
                filteredInteriorData,
                filteredExteriorEnergyData,
                totalPrice
            }

            const pdfBlob = await generateCustomizedHomePDF(config, {
                shouldDownload: false,
                fileName: 'customized-home-configuration.pdf'
            });

            const pdfBase64 = await blobToBase64(pdfBlob);

            try {
                await apiService.sendEmailWithBase64PDF({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    message: data.message,
                    totalPrice: totalPrice.toLocaleString(),
                    pdfBase64: pdfBase64
                });

                reset();
                setTimeout(() => {
                    toast.success('Email sent successfully!');
                    setIsLoading(false);

                    router.push('/send-email-success');
                }, 5000);

            } catch (emailError: any) {
                console.error('Email sending failed:', emailError);
                setIsLoading(false)
                throw emailError;
            }

        } catch (error) {
            console.error('Error sending email:', error);
            setIsLoading(false)
            toast.error('Failed to send email. Please try again.');
        }
    }

    const hasCustomizations = hasAnyCustomizations()

    return (
        <div className="max-w-7xl w-full mx-auto ">
            <div className="bg-[#F8F8F8] border border-[#F0EBFF] rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Send Customized Home
                </h2>

                {/* Warning message only after submit attempt with no selections */}
                {showNoCustomizationError && !hasCustomizations && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    No Customizations Selected
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        You haven't selected any home customizations yet. Please go back and select at least one feature before submitting.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Fields - Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-[#4A4C56]">
                                First Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="firstName"
                                placeholder='First Name'
                                {...register("firstName", { required: "First name is required" })}
                                className={errors.firstName ? "border-red-500" : ""}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-[#4A4C56]">
                                Last Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="lastName"
                                placeholder='Last Name'
                                {...register("lastName", { required: "Last name is required" })}
                                className={errors.lastName ? "border-red-500" : ""}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Contact Fields - Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-[#4A4C56]">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder='Email'
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-[#4A4C56]">
                                Phone <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder='Phone'
                                {...register("phone", { required: "Phone number is required" })}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Message Field - Single Column */}
                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium text-[#4A4C56]">
                            Message <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Write something"
                            {...register("message", { required: "Message is required" })}
                            className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                        />
                        {errors.message && (
                            <p className="text-red-500 text-xs">{errors.message.message}</p>
                        )}
                    </div>

                    {/* Privacy Policy Checkbox */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="acceptPolicy"
                                className='cursor-pointer'
                                checked={watch("acceptPolicy")}
                                onCheckedChange={(checked) => setValue("acceptPolicy", checked as boolean)}
                                {...register("acceptPolicy", {
                                    required: "You must accept the privacy policy to continue"
                                })}
                            />
                            <Label htmlFor="acceptPolicy" className="text-sm text-[#4A4C56]">
                                I accept the privacy policy <span className="text-red-500">*</span>
                            </Label>
                        </div>
                        {errors.acceptPolicy && (
                            <p className="text-red-500 text-xs">{errors.acceptPolicy.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting || isLoading || !watch("acceptPolicy")}
                        className="w-full bg-[#C2A45C] cursor-pointer hover:bg-[#C2A45C]/80 text-white py-3 text-lg font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Processing... Please wait</span>
                            </div>
                        ) : isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Sending...</span>
                            </div>
                        ) : (
                            'Send Email & Generate PDF'
                        )}
                    </Button>
                </form>
            </div>
        </div>

    )
}
