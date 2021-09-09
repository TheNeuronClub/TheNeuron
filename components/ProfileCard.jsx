import Image from 'next/image'
function ProfileCard() {
    return (
        <>
            <div className="max-w-xs py-5 gradient-shadow hover:gradient-shadow-md bg-white rounded-xl flex flex-col items-center justify-center mx-auto min-w-[300px]">
                    <div className="relative w-40 h-40 rounded-full border-8 border-gray-200">
                        <Image src="/images/hiw1.webp" layout="fill" objectFit="cover" className="rounded-full " />
                    </div>
                    <div className="p-4 text-center">
                        <h1 className="text-blue-500 text-xl font-bold">TheNeuron.club</h1>
                        <h1 className="text-lg">Co-Founder</h1>
                        <div className="flex space-x-2 items-center justify-center my-3">
                            <div className="footer__social border border-gray-900">
                                <svg fill="#333" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="Facebook"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path></svg>
                            </div>
                            <div className="footer__social border border-gray-900">
                                <svg fill="#333" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="LinkedIn"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>
                            </div>
                            <div className="footer__social border border-gray-900">
                                <svg fill="#333" viewBox="0 0 24 24" aria-hidden="true" tabIndex="-1" title="Twitter"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default ProfileCard
