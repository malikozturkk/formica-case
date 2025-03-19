"use client"
import Button from "@/elements/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const itemStyle = "text-base font-medium text-black transition-all duration-200 hover:text-primary focus:text-primary"
    const items = [
        { href: "/", title: "Anasayfa" },
    ];
    return (
        <header className={`${open ? "pb-6" : ""} bg-white lg:pb-0 mb-3 md:mb-5 shadow-sm`}>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between relative">
                    <Link href="/" title="Logo" className="flex-shrink-0 py-5 flex font-semibold text-xl">
                        <Image src="/logo.png" width={73} height={80}alt="TCDD Logo" />
                    </Link>
                    <div className="flex items-center gap-5">
                        <Button type="button" className="hidden sm:block rounded-2xl">Üye Girişi</Button>
                        <Button type="button" className="bg-white border-2 border-blue-900 rounded-md" onClick={() => setOpen(!open)}>
                            <svg
                                width={20}
                                height={20}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="text-blue-900"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                            </svg>
                        </Button>
                    </div>
                </nav>

                {open &&
                    <nav className="pt-4 pb-6 mt-3 bg-white border border-primary rounded-md shadow-md">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                {items.map((item, index) => (
                                    <Link key={index} href={item.href} title={item.title} className={itemStyle}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                }
            </div>
        </header>

    )
}

export default Navbar