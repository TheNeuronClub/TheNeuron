import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { pageTransition, pageZoom } from '../util'

function Footer() {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText("contact@theneuron.club")
        setIsCopied(true)
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [isCopied])

    return (
        <div className="footer relative gradient-bg flex flex-col items-start justify-between p-10 pb-5 text-white md:p-20 md:pb-10 md:min-h-[350px]">
            <div className="custom-shape-divider-top-1630316193">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="sm:flex w-full justify-between sm:space-x-5 max-w-7xl mx-auto">
                <div className="">
                    <Link href="/">
                        <div className="relative h-16 w-52">
                            <Image src="/images/logo.png" layout="fill" objectFit="contain" className="drop-shadow-md" />
                        </div>
                    </Link>
                    {/* <p className="py-2 max-w-xl">The Neuron Club is a revolutionary forecasting platform where users can earn rewards by predicting the outcomes of future events. We cover topics across a wide range of categories. */}
                    {/* Subscribe for our early access today to start predicting on 100+ topics or create a topic of your own when we launch! */}
                    {/* </p> */}
                    <ul className="space-x-5 my-2 text-lg font-medium py-2 flex">
                        <Link href="https://www.instagram.com/TheNeuronClub">
                            <div className="footer__social">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" tabIndex="-1" title="Instagram"><path d="M 21.580078 7 C 13.541078 7 7 13.544938 7 21.585938 L 7 42.417969 C 7 50.457969 13.544938 57 21.585938 57 L 42.417969 57 C 50.457969 57 57 50.455062 57 42.414062 L 57 21.580078 C 57 13.541078 50.455062 7 42.414062 7 L 21.580078 7 z M 47 15 C 48.104 15 49 15.896 49 17 C 49 18.104 48.104 19 47 19 C 45.896 19 45 18.104 45 17 C 45 15.896 45.896 15 47 15 z M 32 19 C 39.17 19 45 24.83 45 32 C 45 39.17 39.169 45 32 45 C 24.83 45 19 39.169 19 32 C 19 24.831 24.83 19 32 19 z M 32 23 C 27.029 23 23 27.029 23 32 C 23 36.971 27.029 41 32 41 C 36.971 41 41 36.971 41 32 C 41 27.029 36.971 23 32 23 z" /></svg>
                            </div>
                        </Link>
                        <Link href="https://www.linkedin.com/company/79600516">
                            <div className="footer__social">
                                <svg viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="LinkedIn"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>
                            </div>
                        </Link>
                        <Link href="https://twitter.com/ClubNeuron">
                            <div className="footer__social">
                                <svg viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="Twitter"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
                            </div>
                        </Link>
                        <div className="footer__social relative" onClick={() => copyToClipboard()}>
                            {isCopied && <motion.span initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageZoom}
                                transition={pageTransition} >Email Copied</motion.span>}
                            <svg viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="Mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                        </div>
                    </ul>
                </div>
                <div className="sm:flex sm:space-x-8 lg:space-x-20 my-6">
                    <div className="inline-block mr-14 sm:mr-0 sm:max-w-xs min-w-max">
                        <h1 className="font-semibold text-xl relative mt-5 sm:mt-0">Quick Links</h1>
                        <hr className="h-1 w-3/4 bg-yellow-400 rounded-sm text-yellow-400 border border-yellow-400" />
                        <ul className="flex flex-col text-lg font-medium py-2">
                            <Link href="/">Home</Link>
                            <Link href="/question/">Explore</Link>
                        </ul>

                    </div>
                    <div className="inline-block mr-14 sm:mr-0 sm:max-w-xs min-w-max">
                        <h1 className="font-semibold text-xl relative mt-5 sm:mt-0">Info</h1>
                        <hr className="h-1 w-3/4 bg-yellow-400 rounded-sm text-yellow-400 border border-yellow-400" />
                        <ul className="flex flex-col text-lg font-medium py-2">
                            <Link href="/how_it_works"> How It Works</Link>
                            <Link href="/influencers">Influencers</Link>
                            <Link href="/faq">FAQs</Link>
                        </ul>

                    </div>
                    <div className="inline-block mr-14 sm:mr-0 sm:max-w-xs min-w-max">
                        <h1 className="font-semibold text-xl relative mt-5 sm:mt-0">Other Links</h1>
                        <hr className="h-1 w-3/4 bg-yellow-400 rounded-sm text-yellow-400 border border-yellow-400" />
                        <ul className="flex flex-col text-lg font-medium py-2">
                            <Link href="/privacy_policy">Privacy Policy</Link>
                            <Link href="/contact">Contact Us</Link>
                            <Link href="/report_bug">Report a Bug</Link>
                        </ul>

                    </div>
                </div>
            </div>
            <h1 className="text-right w-full text-lg font-semibold border-t-2 border-gray-200 text-gray-200 p-2">@TheNeuron.club 2021</h1>

        </div>
    )
}

export default Footer
