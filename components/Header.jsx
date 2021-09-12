import Image from 'next/image'
import Link from 'next/link'

function Header() {
    return (
        <div className="relative gradient-bg min-h-[700px] sm:min-h-[730px] md:min-h-[600px] lg:min-h-[650px]">
            <div className="absolute flex flex-col-reverse md:flex-row w-full items-center bottom-6 md:bottom-12 p-10 lg:px-28 pt-0 left-0 text-white">
                <div>
                    <h1 className='text-4xl font-bold leading-tight max-w-md sm:text-5xl md:text-6xl lg:text-7xl'>Predict future and win rewards!</h1>
                    <p className="py-4 text-base sm:text-lg max-w-lg xl:max-w-xl lg:text-xl">The Neuron Club (TNC) is an online gaming platform that allows users to predict global events across categories and win rewards</p>
                    <Link href="/signup">
                        <button className="btn text-xl mt-2">Sign Up</button>
                    </Link>
                </div>
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:scale-125 mx-auto">
                    <Image src="/images/header.png" layout="fill" objectFit="contain" className="drop-shadow-lg" />
                </div>

            </div>
            <div className="custom-shape-divider-bottom-1630315778">
                <svg data-name="SVG Layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

export default Header
