import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Customizations', href: '/customizations' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Features', href: '/features-details' }
    ]

    return (
        <footer className="bg-black text-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main footer content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
                    {/* Logo section */}
                    <div className="flex items-center">
                        <Image
                            src="/images/logo/logo.png"
                            alt="Freepoint Homes Logo"
                            width={500}
                            height={500}
                            className="mr-2 w-full h-full"
                        />
                    </div>

                    {/* Navigation links */}
                    <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
                        {navLinks.map((link, index) => (
                            <Link key={index} href={link.href} className="hover:text-[#FEFEFE]/80 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Contact information */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <a href="mailto:contact@freepointhomes.com" className="hover:text-[#FEFEFE]/80 transition-colors">
                                contact@freepointhomes.com
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <a href="tel:+12068553192" className="hover:text-[#FEFEFE]/80 transition-colors">
                                (206)-855-3192
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider line */}
                <div className="border-t border-gray-600 mb-4"></div>

                {/* Copyright */}
                <div className="text-center text-sm text-gray-400">
                    © {currentYear} All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}
