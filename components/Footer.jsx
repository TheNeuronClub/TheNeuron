import Image from 'next/image'
import Link from 'next/link'

function Footer() {
    return (
        <div className="footer relative gradient-bg flex flex-col items-start justify-between p-10 pb-5 text-white md:p-20 md:pb-10 md:min-h-[350px]">
            <div className="custom-shape-divider-top-1630316193">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" className="shape-fill"></path>
                </svg>
            </div>
            <div>
            <Link href="/">
                {/* <h1 className="text-3xl lg:text-4xl font-bold cursor-pointer">LOGO.</h1> */}
                <div className="relative h-10 w-48">
                    <Image src="/images/logo.png" layout="fill" objectFit="contain" className="drop-shadow-md" />
                </div>
                </Link>
                <p className="py-2 max-w-md">The Neuron Club is a revolutionary forecasting platform where users can earn rewards by predicting the outcomes of future events. We cover topics across a wide range of categories. Subscribe for our early access today to start predicting on 100+ topics or create a topic of your own when we launch!</p>
            </div>

            <div className="md:flex items-center justify-between w-full">
                <ul className="my-2 text-lg font-medium py-2">
                    <Link href="/how_it_works"> How It Works</Link>
                    <Link href="/faq">FAQs</Link>
                    <Link href="/privacy_policy">Privacy Policy</Link>
                    <Link href="/contact">Contact Us</Link>
                </ul>
                <ul className="space-x-5 my-2 text-lg font-medium py-2 flex">
                    <div className="footer__social">
                        <svg className="" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="Facebook"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path></svg>
                    </div>
                    <div className="footer__social">
                        <svg className="" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="LinkedIn"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>
                    </div>
                    <div className="footer__social">
                        <svg className="" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="Twitter"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
                    </div>
                    <div className="footer__social">
                        <svg className="" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="YouTube"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path></svg>
                    </div>
                    <div className="footer__social">
                        <svg className="" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="Mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                    </div>
                </ul>

            </div>
            <h1 className="text-right w-full text-lg font-semibold border-t-2 border-gray-200 text-gray-200 p-2">@TheNeuron.club 2021</h1>

        </div>
    )
}

export default Footer
