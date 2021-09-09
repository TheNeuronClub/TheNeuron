import { XIcon } from "@heroicons/react/solid"
import {useState} from 'react'

function Modal({ state }) {
    const [isActive, setIsActive] = useState(state)
    return (
        <>
      {isActive &&  <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full grid place-items-center bg-black bg-opacity-10" onClick={() => setIsActive(false)} >
            <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 bg-white rounded-lg shadow-xl">
                <XIcon className="h-10 w-10 absolute top-4 right-5 cursor-pointer active:scale-95 transition-sm text-black" onClick={() => setIsActive(false)} />
                <h1 className="text-2xl md:text-3xl tracking-wide text-center font-medium leading-snug m-4">
                    Thanks for contacting us. We’ll respond as soon as possible.
                </h1>
            </div>
        </div>}
        </>
    )
}

export default Modal
