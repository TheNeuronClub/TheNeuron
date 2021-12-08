import { PlusIcon, XIcon } from "@heroicons/react/solid"
import { RefreshIcon } from "@heroicons/react/outline"
import { useState } from 'react'

const QCategory = ({ text, onSelect }) => {
    return (
        <>
            <div className="flex items-center text-gray-900 font-medium bg-white shadow-lg rounded-3xl p-2">
                <h1 className="text-sm md:text-base lg:text-lg capitalize px-2">{text.category}</h1>
                <XIcon className="h-4 w-4 text-gray-500 hover:text-red-400 cursor-pointer" onClick={() => onSelect(text._id)} />
            </div>
        </>
    )
}

function QCategorySetting({ category }) {
    const [categoryData, setCategoryData] = useState([...category])
    const [isSending, setIsSending] = useState(false)
    const [item, setItem] = useState('')

    const handleSubmit = async (e) => {
        if (e) { e.preventDefault() }
        setIsSending(true);
        const res = await fetch(`/api/question/queCategory`, {
            method: 'POST',
            body: item?.toLowerCase()
        })

        console.log(res.status)
        if (res.status === 201) {
            const response = await res.json();
            console.log(response)
            setItem('')
            setIsSending(false)
            console.log('category data : ', categoryData)
            categoryData?.length > 0 ? setCategoryData([...categoryData, response]) : setCategoryData([...response])
        }
        setIsSending(false)
    }

    const delCategory = async (id) => {
        const res = await fetch(`/api/question/queCategory?_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            const index = categoryData.findIndex((category) => category._id == id)
            if (index >= 0) {
                categoryData.splice(index, 1)
            } else {
                console.warn(`Can't remove category`)
            }
            setCategoryData([...categoryData]);
        }
    }

    return (
        <div className="mb-10">
            <h1 className="text-3xl font-semibold py-2 sm:px-5 text-white">Question Categories </h1>
            <form className="flex items-center pl-4 sm:ml-5 pr-2 py-2 space-x-2 my-3 bg-white max-w-max rounded-full" onSubmit={handleSubmit}>
                <input type="text" value={item} required placeholder="Add a Category" className="bg-transparent font-medium text-gray-900 text-lg leading-relaxed focus:outline-none px-1" onChange={(e) => { e.preventDefault(); setItem(e.target.value) }} />
                <button type="submit" className="btn-blue rounded-full p-2" disabled={isSending}>
                    {isSending ?
                        <RefreshIcon className="w-5 h-5 sm:w-7 sm:h-7 animate-spin text-gray-100" />
                        : <PlusIcon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-100" />}
                </button>
            </form>
            {categoryData?.length > 0 ?
                <>
                    <div className="flex flex-wrap items-center gap-x-4 lg:gap-6 gap-y-4 lg:gap-y-6 sm:px-5">
                        {categoryData.map(text => <QCategory key={text._id} text={text} onSelect={delCategory} />)}
                    </div>
                </>
                :
                <h1 className="text-lg sm:text-xl 2xl:text-2xl text-white font-medium p-5">No Question Categories Available</h1>
            }
        </div>
    )
}

export default QCategorySetting
