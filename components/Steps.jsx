import Image from "next/image"
function Steps({step}) {
    return (
        <div className={`mx-5 sm:max-w-3xl lg:max-w-5xl md:flex items-center sm:mx-auto p-5 sm:py-10 rounded-lg hover:scale-[1.01] transition-md bg-white sm:gradient-shadow ${step.no%2!==0 && 'flex-row-reverse'}`}>
            <div className="relative mx-auto w-80 sm:w-96 md:min-w-[350px] h-72">
            <Image src={step.img} layout="fill" objectFit="fill" className="rounded-xl" />
            </div>
            <div className="p-5 sm:px-10 lg:px-20">
                <h1 className="text-blue-400 text-2xl font-medium">Step {step.no}</h1>
                <h1 className="text-3xl lg:text-5xl font-bold my-2 md:my-3 text-gray-800">{step.heading}</h1>
                <p className="text-lg">{step.desc}</p> 
            </div>
        </div>
    )
}

export default Steps
