import { ClockIcon } from '@heroicons/react/solid'

function Question({ question }) {
    return (
        <div className="max-w-xs mx-auto p-4 rounded-lg border-2 bg-white hover:gradient-shadow border-blue-500 flex flex-col">
            <div className="flex space-x-2 flex-col-reverse sm:flex-row">
                <h1 className="line-clamp-4 text-base mt-1 sm:mt-0">{question.question}</h1>
                <img src={question.image} layout="fill" className="w-10 h-10 border-4 border-blue-100 gradient-shadow-lg hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
            </div>
            <div className="h-4 w-full"></div>
            {/* <h1 className="text-center flex my-2"><ClockIcon className="h-7 text-blue-500" /> <span className="inline-block w-14">{Math.floor(Math.random() * 10)}h left</span></h1> */}
            <div className="flex items-center justify-between mt-auto">
                <div className="text-sm">
                    <h1 className="text-gray-400">Volume</h1>
                    <h2>{question.volume}</h2>
                </div>
                <div className="text-right flex flex-col items-end text-sm">
                    {/* <h1 className="text-gray-400">Bets</h1>
                    <h1>{Math.floor(Math.random() * 100)}/100</h1> */}
                    <ClockIcon className="h-6 sm:h-7 text-blue-500" /> <span className="">{Math.floor(Math.random() * 10)}h left</span>
                </div>
            </div>
        </div>
    )
}

export default Question
