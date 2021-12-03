import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/solid"
import { useState } from "react"

const CarouselItem = ({ item, onSelect }) => {
    const [isActive, setIsActive] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [newImage, setNewImage] = useState(false)
    const [newData, setNewData] = useState({
        heading: item.heading,
        desc: item.desc,
        imgSrc: item.imgSrc
    })
    const handleChange = (e) => {
        e.preventDefault();
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }
    const updateCarousel = async (e) => {
        e.preventDefault();
        // if (carouselImage?.size < 1000000) {
        setIsSending(true);
        const formData = new FormData();
        formData.append("image", newImage);
        formData.append("heading", newData.heading);
        formData.append("desc", newData.desc);
        const res = await fetch(`/api/carousel?_id=${item?._id}`, {
            method: 'PATCH',
            body: formData
        })

        const response = await res.json();
        console.log(res.status)
        if (response) {
            setNewData(response)
        }
        setIsSending(false)
        setIsActive(false)
        // }
    }
    return (
        <>
            {
                !isActive ?
                    <div className="m-4 my-6 relative">
                        <PencilIcon className="absolute -top-5 right-10 cursor-pointer p-2 rounded-full bg-white shadow-lg w-10 h-10 text-blue-600" onClick={() => setIsActive(true)} />
                        <TrashIcon className="absolute -top-5 -right-2 cursor-pointer p-2 rounded-full bg-white shadow-lg w-10 h-10 text-red-600" onClick={() => setIsDelete(true)} />
                        <img className="w-96 h-96 object-cover rounded-md" src={newData.imgSrc} alt="" />
                        <div className="absolute bottom-0 w-full p-3 blur-black">
                            <h1 className="text-2xl font-semibold text-gray-50">{newData.heading}</h1>
                            <p className="text-lg font-medium text-gray-50 line-clamp-3">{newData.desc}</p>
                        </div>
                    </div>
                    :
                    <form className="max-w-md m-4 my-6 p-5 bg-white" onSubmit={updateCarousel}>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="attachment" className="inline-block mb-1 font-medium">Carousel Image<span className="mx-1 text-red-500">*</span></label>
                            <input type="file" name="attachment" accept="image/*"
                                onChange={(e) => setNewImage(e.target.files[0])}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {/* {(carouselImage?.size > 1000000) && <p className="text-red-500 text-sm">Maximum image upload size is 1MB </p>} */}
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="heading" className="inline-block mb-1 font-medium">Carousel Heading<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Heading "
                                required
                                minLength="2"
                                type="text"
                                name="heading"
                                value={newData.heading}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="message" className="inline-block mb-1 font-medium">Carousel Description</label>
                            <textarea
                                placeholder="Describe here ..."
                                minLength="2"
                                type="text"
                                name="desc"
                                value={newData.desc}
                                onChange={handleChange}
                                className="flex-grow w-full resize-none py-2 h-24 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button type="submit" className="px-5 py-2 text-lg btn-blue rounded-xl font-semibold active:scale-95 transition-sm">{isSending ? `Saving...` : `Save`}</button>
                        <button className="px-5 py-2  ml-4  text-lg btn-black rounded-xl font-semibold active:scale-95 transition-sm" onClick={() => {
                            setIsActive(false); setNewData({
                                heading: item.heading, desc: item.desc, imgSrc: item.imgSrc
                            })
                        }}>Cancel</button>
                    </form>
            }

            {isDelete && <div className="fixed inset-0 w-full h-screen blur-black grid place-items-center z-50" >
                <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 md:px-10 blur-gray rounded-xl shadow-2xl m-4">
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium text-white z-50 leading-tight">
                        Do you want to delete this Carsousel Image ?
                    </h1>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-100 border border-gray-100 hover:bg-gray-100 hover:text-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsDelete(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-orange text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => { onSelect(item?._id); setIsDelete(false) }}>Delete</button>
                    </div>
                </div>
            </div>}

        </>
    )
}

function setting({ carouselList }) {
    const [carouselData, setCarouselData] = useState([...carouselList])
    const [carouselImage, setCarouselImage] = useState();
    const [isForm, setIsForm] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [data, setData] = useState({
        heading: '',
        desc: ''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (carouselImage?.size < 1000000) {
        setIsSending(true);
        const formData = new FormData();
        formData.append("image", carouselImage);
        formData.append("heading", data.heading);
        formData.append("desc", data.desc);
        const res = await fetch(`/api/carousel`, {
            method: 'POST',
            body: formData
        })

        const response = await res.json();
        console.log(res.status)
        if (res.status === 201) {
            setData({
                heading: '',
                desc: ''
            })
            setCarouselImage(null)
            setIsSending(false)
            carouselData?.length > 0 ? setCarouselData([...carouselData, response]) : setCarouselData([...response])
        }
        setIsSending(false)
        setIsForm(false)
        // }
    }

    const delCarousel = async (id) => {
        const res = await fetch(`/api/carousel?_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            const index = carouselData.findIndex((carousel) => carousel._id == id)
            if (index >= 0) {
                carouselData.splice(index, 1)
            } else {
                console.warn(`Can't remove carousel`)
            }
            setIsForm(false)
            setCarouselData([...carouselData]);
        }
    }

    return (
        <>
            <div className="w-full min-h-screen p-10 relative">
                <h1 className="text-3xl font-semibold py-2 px-5 text-white">Carousel Setting </h1>
                <div className="flex flex-wrap items-center justify-around">
                    {carouselData?.length > 0 && carouselData?.map(item => (
                        <CarouselItem key={item._id} item={item} onSelect={delCarousel} />
                    ))}
                    {
                        !isForm ?
                            <div className="w-96 grid place-items-center text-lg text-gray-100 font-medium p-5 cursor-pointer" onClick={() => setIsForm(true)}>
                                <PlusCircleIcon className="w-32 h-32 text-gray-50" />
                                Add Carousel Item
                            </div>
                            :
                            <form className="max-w-md m-4 my-6 p-5 bg-white" onSubmit={handleSubmit}>
                                <div className="mb-1 sm:mb-2">
                                    <label htmlFor="attachment" className="inline-block mb-1 font-medium">Carousel Image<span className="mx-1 text-red-500">*</span></label>
                                    <input type="file" required name="attachment" accept="image/*"
                                        onChange={(e) => setCarouselImage(e.target.files[0])}
                                        className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    />
                                    {/* {(carouselImage?.size > 1000000) && <p className="text-red-500 text-sm">Maximum image upload size is 1MB </p>} */}
                                </div>
                                <div className="mb-1 sm:mb-2">
                                    <label htmlFor="heading" className="inline-block mb-1 font-medium">Carousel Heading<span className="mx-1 text-red-500">*</span></label>
                                    <input
                                        placeholder="Heading "
                                        required
                                        minLength="2"
                                        type="text"
                                        name="heading"
                                        value={data.heading}
                                        onChange={handleChange}
                                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-1 sm:mb-2">
                                    <label htmlFor="message" className="inline-block mb-1 font-medium">Carousel Description</label>
                                    <textarea
                                        placeholder="Describe here ..."
                                        minLength="2"
                                        type="text"
                                        name="desc"
                                        value={data.desc}
                                        onChange={handleChange}
                                        className="flex-grow w-full resize-none py-2 h-24 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <button type="submit" className="px-5 py-2 btn-blue text-lg rounded-xl font-semibold active:scale-95 transition-sm">{isSending ? `Adding...` : `Add`}</button>
                                <button className="px-5 py-2 btn-black ml-2 text-lg rounded-xl font-semibold active:scale-95 transition-sm" onClick={() => setIsForm(false)}>Cancel</button>
                            </form>
                    }
                </div>

            </div>
        </>
    )
}

export default setting

export async function getServerSideProps() {
    const carouselList = await fetch(`${process.env.HOST}/api/carousel`).then((res) => res.json());
    return {
        props: {
            carouselList
        }
    }
}
