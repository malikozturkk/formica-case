"use client"
import Button from "@/elements/button"
import Dialog from "@/elements/dialog"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import LoginForm from "../LoginForm"
import { useAuth } from "@/context/authContext"
import { formatPrice } from "@/utils/formaters"

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const [loginDialog, setLoginDialog] = useState(false)
    const { user, logout, loading } = useAuth();

    const navItemsClassName = "text-base font-medium text-gray-800 transition-all duration-200 hover:text-primary focus:text-primary px-4"
    return (
        <header className={`${open ? "pb-6" : ""} bg-white lg:pb-0 mb-3 md:mb-5 shadow-sm`}>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between relative">
                    <Link href="/" title="Logo" className="flex-shrink-0 py-5 flex font-semibold text-xl">
                        <Image src="/logo.png" width={73} height={80}alt="TCDD Logo" />
                    </Link>
                    <div className="flex items-center gap-5">
                        <Button type="button" className="hidden sm:block rounded-2xl" loading={loading} onClick={() => !user && setLoginDialog(true)}>{user ? `${user.firstName} ${user.lastName}` : "Üye Girişi"}</Button>
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
            </div>

                {open && (
                    <div 
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={() => setOpen(false)}
                    ></div>
                )}
            
                <div className={`fixed top-0 right-0 h-full w-3/4 md:w-96 bg-white shadow-lg z-50 transform ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                    <div className="p-4">
                        {open &&
                            <button className="cursor-pointer absolute -left-12 w-9 h-9" onClick={() => setOpen(false)}>
                                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"></path> </g></svg>
                            </button>
                        }
                        <div className="flex flex-col space-y-4">
                            <div className="border-b border-gray-200 pb-4 flex flex-col gap-3 items-start px-4 justify-between md:items-center md:flex-row md:px-0">
                                <Button type="button" className="rounded-2xl float-right w-auto" loading={loading} onClick={() => !user && setLoginDialog(true)}>
                                    {user ? `Hoşgeldiniz, ${user.firstName} ${user.lastName}` : "Üye Girişi"}
                                </Button>
                                <p className="text-base font-bold text-[#444763] leading-normal">Bakiye: {formatPrice(user?.balance)}</p>
                            </div>
                            <Link href="/" title="Anasayfa" className={navItemsClassName} onClick={() => setOpen(!open)}>
                                Anasayfa
                            </Link>
                            {user &&
                                <>
                                    <Link href="/tickets" title="Biletlerim" className={navItemsClassName} onClick={() => setOpen(!open)}>
                                        Biletlerim
                                    </Link>
                                    <Link href="/check-in" title="Check-In" className={navItemsClassName} onClick={() => setOpen(!open)}>
                                        Check-in Yap
                                    </Link>
                                    <Link href="#" title="Çıkış Yap" className={navItemsClassName} onClick={() => {logout(), setOpen(!open)}}>
                                        Çıkış Yap
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <Dialog isOpen={loginDialog} onClose={() => setLoginDialog(false)} title="Giriş Yap">
                    <LoginForm setLoginDialog={setLoginDialog}  />
                </Dialog>
        </header>

    )
}

export default Navbar