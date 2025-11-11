'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useEffect } from 'react'
import { useState } from 'react'

const navLinks = [
    { name: 'About', href: '/' },
    { name: 'Customizations', href: '/customizations' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Features', href: '/features-details' },
]

export default function Navbar() {
    const pathname = usePathname()
    // animate the navbar when scroll down with delay
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const isScrollingUp = scrollY < lastScrollY

            // Clear existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }

            // Show navbar immediately when scrolling up or at top
            if (isScrollingUp || scrollY <= 50) {
                setIsVisible(true)
                setIsScrolled(scrollY > 100)
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout)
                    setScrollTimeout(null)
                }
            } else if (scrollY > 100) {
                // Hide navbar when scrolling down past 100px
                setIsScrolled(true)
                setIsVisible(false)

                // Show navbar after 1.5 seconds of no scrolling
                const timeout = setTimeout(() => {
                    setIsVisible(true)
                }, 1500)

                setScrollTimeout(timeout)
            }

            setLastScrollY(scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
        }
    }, [scrollTimeout, lastScrollY])

    return (
        <nav className={`fixed top-0 left-0 right-0 flex items-center justify-between h-16 w-full bg-[#F3F4F6] z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'shadow-lg' : ''
            } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
            {/* Left: Logo with angled black background */}
            <div className="relative h-full flex items-center">
                <div
                    className="h-full bg-black flex items-center pr-14 sm:pr-20 lg:pr-24 2xl:pr-48 relative"
                    style={{
                        clipPath: 'polygon(0 0, calc(100% - 60px) 0, 100% 100%, 0% 100%)'
                    }}
                >

                    <Link href="/" className="flex items-center gap-3 pl-5 sm:pl-2 lg:pl-10 xl:pl-24 2xl:pl-48">
                        <Image width={500} height={500} src="/images/logo/logo.png" alt="logo" className="w-full h-full cursor-pointer" />
                    </Link>

                </div>
            </div>

            {/* Hamburger for mobile (shadcn/ui Sheet) */}
            <div className="lg:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <button className="p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100 rounded" aria-label="Open menu">
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 7h20M4 14h20M4 21h20" />
                            </svg>
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-3/4 max-w-sm">
                        <SheetTitle className="sr-only">Main Menu</SheetTitle>
                        <div className="h-full flex flex-col gap-6 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Image width={120} height={40} src="/images/logo/logoB.png" alt="logo" />
                            </div>
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsSheetOpen(false)}
                                    className={`text-lg text-[14px] sm:text-[16px] font-medium px-1 rounded transition-colors duration-200
                                        ${pathname === link.href
                                            ? 'text-[#cbb26a] font-medium'
                                            : 'text-[#4A4C56] hover:text-[#cbb26a]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-8 border-t pt-6 flex flex-col gap-4 text-[#4A4C56] text-base">
                                <div className="flex items-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <span className='text-[14px] sm:text-[16px]'> (206)-855-3192</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <span className='text-[14px] sm:text-[16px]'>contact@freepointhomes.com</span>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden lg:flex gap-3 xl:gap-8 items-center absolute left-1/2 transform -translate-x-1/2 ">
                {navLinks.map(link => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`relative text-[14px] 2xl:text-[16px] px-1 transition-all duration-200 hover:scale-105
                            ${pathname === link.href
                                ? 'text-[#cbb26a]'
                                : 'text-[#4A4C56] hover:text-[#cbb26a]'
                            }`}
                    >
                        {link.name}
                        {pathname === link.href && (
                            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#cbb26a] rounded transition-all duration-300"></span>
                        )}
                    </Link>
                ))}
            </div>

            {/* Right: Contact Info (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-6  text-[#4A4C56] text-sm pr-5 lg:pr-10 xl:pr-24 2xl:pr-48">
                <div className="flex items-center gap-2 transition-colors duration-200 hover:text-[#cbb26a]">
                    {/* Phone Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className='text-[14px] 2xl:text-[16px]'>(206)-855-3192</span>
                </div>
                <div className="flex items-center gap-2 transition-colors duration-200 hover:text-[#cbb26a]">
                    {/* Email Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className='text-[14px] 2xl:text-[16px]'>contact@freepointhomes.com</span>
                </div>
            </div>
        </nav>
    )
}