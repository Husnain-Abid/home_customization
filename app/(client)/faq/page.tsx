"use client"

import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqPage() {
    const faqData = [
        {
            question: "How do I start customizing my modular home?",
            answer: "To begin customizing, simply click on the \"Start Customizing\" button on our homepage. You can then select various features, such as the kitchen layout, bathroom design, exterior options, and more. The platform will provide real-time updates on pricing as you make your selections."
        },
        {
            question: "How do I see the price of my customizations?",
            answer: "The pricing is displayed in real-time as you make selections. You'll see the total cost update automatically in the pricing panel on the right side of the customization interface. Each feature you add or modify will immediately reflect in the total price."
        },
        {
            question: "Can I see a 360° view of my customized home?",
            answer: "Yes! Our platform includes an interactive 3D viewer that allows you to rotate and view your customized home from any angle. Simply use the 360° viewer controls to explore your design from all perspectives."
        },
        {
            question: "How long does it take to build my customized home?",
            answer: "Construction time varies depending on the complexity of your customizations, but typically ranges from 8-12 weeks from the start of construction. We'll provide you with a detailed timeline once your design is finalized."
        },
        {
            question: "Can I make changes after submitting my customization?",
            answer: "Yes, you can make changes to your design up until the construction phase begins. However, changes made after the initial submission may affect the timeline and pricing. We recommend finalizing your design before construction starts."
        },
        {
            question: "How do I receive my confirmation or design summary?",
            answer: "Once you submit your customization, you'll receive an email confirmation with a detailed design summary. This includes all your selections, pricing breakdown, and next steps in the process."
        },
        {
            question: "Do you offer financing options?",
            answer: "Yes, we offer various financing options to make your dream home affordable. Our team can help you explore different payment plans, loans, and financing solutions that work best for your situation."
        },
        {
            question: "What happens after I submit my design?",
            answer: "After submitting your design, our team will review your specifications and contact you within 24-48 hours to discuss the next steps, including timeline, permits, and construction scheduling."
        },
        {
            question: "How can I contact customer support?",
            answer: "You can reach our customer support team through multiple channels: phone, email, or live chat on our website. We're available Monday through Friday, 9 AM to 6 PM, and we'll respond to all inquiries within 24 hours."
        },
        {
            question: "How do you handle my personal information?",
            answer: "We take your privacy seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent, and you can request deletion of your information at any time."
        }
    ]

    return (
        <div className="max-w-7xl mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Frequently Asked Questions (FAQ)
                </h1>
                <p className="text-md text-gray-600 max-w-3xl mx-auto">
                    Choose your layout, add features, and see real-time updates all designed to fit your lifestyle and your budget.
                </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4 ">
                {faqData.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-gray-200 rounded-lg px-6 py-4 hover:shadow-md transition-shadow duration-200"
                    >
                        <AccordionTrigger className="text-left text-lg font-semibold text-[#4A4C56] hover:no-underline py-2">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#4A4C56] leading-relaxed pt-2">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
