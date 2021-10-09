import { XCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
function OnBoarding(props) {
    const data = [
        { id: 0, imgSrc: 'https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' },
        { id: 1, imgSrc: 'https://images.unsplash.com/photo-1526933970935-5b59e720c628?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80' },
        { id: 2, imgSrc: 'https://images.unsplash.com/photo-1558698872-5950d0ecf27c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' },
        { id: 3, imgSrc: 'https://images.unsplash.com/photo-1615561916422-7014e1078997?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' },
        { id: 4, imgSrc: 'https://images.unsplash.com/photo-1544197059-edf033171da5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80' }
    ]
    const [state, setState] = useState(data[0])

    return (
        <>
       { state &&
            <div className="fixed top-0 left-0 w-full h-full z-50 grid place-items-center bg-black bg-opacity-20">
                <div className="bg-white p-5 md:p-10 rounded-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative">
                    <img src={state?.imgSrc} className="object-fill h-60 sm:h-80 rounded-xl" />
                    <div className="mt-6 sm:mt-8">
                      {state?.id !== 0 && <button className="btn-primary float-left" onClick={() => setState(data[state.id - 1])}>Previous</button>}
                    {state?.id < data?.length && <button className="btn-primary float-right" onClick={() => state?.id < data?.length - 1 ? setState(data[state.id + 1]) : props.onSelect()}>{state?.id < data?.length - 1 ? 'Next' : 'Exit'}</button> }
                    </div>
                    <button className="absolute -top-5 -right-5" onClick={() => props.onSelect()} ><XCircleIcon className="h-10 w-10 sm:w-12 sm:h-12 md:w-16 md:h-16 p-1 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
                </div>
            </div>}
        </>
    )
}

export default OnBoarding
