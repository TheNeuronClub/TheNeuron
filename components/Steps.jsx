import Image from "next/image"
function Steps({ step, type }) {
    return (
        <div className={`md:mx-5 sm:max-w-3xl lg:max-w-5xl md:flex items-center sm:mx-auto p-5 sm:py-10 ${step.no % 2 !== 0 ? type==='bid' ?'flex-row-reverse' : 'flex-row' : type==='coin' ? 'flex-row-reverse' : 'flex-row' }`}>
            <div className="relative mx-auto w-80 sm:w-96 md:min-w-[350px] h-72">
                <Image src={step.img} layout="fill" objectFit="fill" className="rounded-xl" />
            </div>
            <div className="p-5 sm:px-10 lg:px-20">
                <h1 className="text-blue-400 text-2xl font-medium">Step {step?.no}</h1>
                <h1 className="text-3xl lg:text-5xl font-bold my-2 md:my-3 text-gray-800">{step.heading}</h1>
                <p className="text-lg">{step?.desc}</p>
                {step?.sub_desc && <ul>
                    {step?.sub_desc?.map((item, i) => (
                        <li key={i}><p><b>Tip: </b>{item}</p></li>
                    ))}
                    </ul>}
                {step?.other && <ul className="mt-2">
                    {
                        step?.other?.map((item, i) => (
                            <li key={i}><p>{i + 1}. {item}</p></li>
                        ))
                    }
                </ul>}
            </div>
        </div>
    )
}

export default Steps
