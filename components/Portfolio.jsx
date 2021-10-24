import { userSession } from "../lib/user-session"
import { useSelector } from "react-redux";
import { balance } from '../slices/userBalance';
import Coin from "./Coin";
import { PencilIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import { useRef, useEffect, useState } from "react";
import Question from "./Question";
import { countries } from '../util'

function Portfolio() {
    const session = userSession();
    const amount = useSelector(balance)

    const [isEdit, setIsEdit] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [data, setData] = useState({
        email: session?.email,
        name: session?.name,
    })

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const [image, setImage] = useState();
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }
    }, [image])

    const updateUser = async () => {
        setIsUpdating(true)
        const formData = new FormData();
        formData.append("image", image);
        formData.append("email", data.email);
        formData.append("_id", session?._id);
        formData.append("name", data.name);
        // formData.append("username", data.username);
        // formData.append("country", data.country);
        const res = await fetch(`/api/user/update_user`, {
            method: 'POST',
            body: formData
        })
        const response = await res.json();
        if (res.status === 200) {
            window.localStorage.setItem('neuron-token', JSON.stringify(response.token))
            setIsEdit(false);
        }
        else {
            console.log("User Unauthorized")
        }
        setIsUpdating(false);
        setIsEdit(false)
    }

    const [userQuestions, setUserQuestions] = useState()

    const getQuestion = async () => {
        const res = await fetch(`/api/user/questions?userId=${session?._id}`);
        console.log(res.status)
        const response = await res.json();
        setUserQuestions(response)
    }
    useEffect(() => {
        getQuestion();
    }, []);


    return (
        <>
            <div className="min-h-[225px] w-full max_w_3xl relative gradient-bg">
                <div className="w-full h-48 rounded-full absolute -bottom-20 transform left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
                    <div className="relative p-2 rounded-full bg-white">
                        {
                            preview || session?.image_url ?
                                <img className="w-40 lg:w-48 h-40 lg:h-48 object-cover overflow-hidden rounded-full" src={preview || session?.image_url} alt="profile_pic" onClick={() => (fileInputRef.current.click())} />
                                :
                                <img className="w-40 lg:w-48 h-40 lg:h-48 object-cover overflow-hidden rounded-full" src="/images/user.png" alt="profile_pic" onClick={() => (fileInputRef.current.click())} />
                        }
                        {isEdit && <div className={`cursor-pointer border-8 border-white absolute w-40 lg:w-48 h-40 lg:h-48 rounded-full top-2 bg-gray-700 bg-opacity-40 font-semibold text-3xl grid place-items-center text-center text-white ${image && 'hidden'}`} onClick={() => (fileInputRef.current.click())}> Upload <br />Image </div>}
                        <input type="file" disabled={!isEdit} name="image" className="hidden" ref={fileInputRef} accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.type.substring(0, 5) === 'image') {
                                setImage(file)
                            } else if (!file) {
                            }
                            else {
                                window.alert('Only Image allowed')
                            }
                        }} />
                    </div>
                    {isEdit ?
                        <>
                            <div className="flex">
                                <button className="px-4 py-2 text-lg lg:text-xl text-gray-800 rounded-xl font-semibold hover:text-green-500 transition-sm items-center inline-flex" onClick={updateUser}>{isUpdating ? 'Updating...' : <><CheckIcon className="w-6 mr-1" />Update </>}</button>
                                <button className="px-4 py-2 text-lg lg:text-xl text-gray-800 rounded-xl font-semibold hover:text-red-500 transition-sm items-center inline-flex" onClick={() => setIsEdit(false)}> <XIcon className="w-6 mr-1" />Cancel</button>
                            </div>
                        </>
                        :
                        <button className="px-5 py-3 text-lg lg:text-xl text-gray-800 rounded-xl font-semibold hover:text-blue-500 transition-sm flex items-center" onClick={() => setIsEdit(true)}> <PencilIcon className="w-6 mr-1" />Edit Profile</button>
                    }
                </div>
            </div>
            <div className="flex flex-col justify-start w-full max-w-max gap-y-4 gap-x-6 md:gap-y-6 md:gap-x-8 xl:gap-x-10 text-xl lg:text-2xl mx-auto font-medium text-gray-700 px-10 pt-32 lg:pt-36 pb-5">
                <div className="flex items-center max-w-max space-x-4">
                    <h1>Name:&nbsp; </h1>
                    {isEdit ? <input type="text" name="name" onChange={handleChange} value={data.name} className="outline-none text-lg h-10 px-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" /> : <h2 className="font-normal text-lg break-all">{session?.name}</h2>}
                </div>
                <div className="flex items-center max-w-max space-x-4">
                    <h1>Email:&nbsp; </h1>
                    <h2 className="font-normal break-all text-lg">{session?.email}</h2>
                </div>
                {/* <div className="flex items-center max-w-max space-x-4">
                    <h1>Username:&nbsp; </h1>
                    {isEdit ? <input type="text" name="username" onChange={handleChange} value={data.username} className="outline-none text-lg h-10 px-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" /> : <h2 className="font-normal break-all">{session?.username}</h2>}
                </div> */}
                {/* <div className="flex items-center max-w-max space-x-4">
                    <h1>Country:&nbsp; </h1>
                    {isEdit ? <select onChange={handleChange} className="outline-none text-lg h-10 cursor-pointer px-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" type="country" name="country" value={data.country} required placeholder="Country ">
                        <option value="" disabled>Choose Your Country </option>
                        {countries.map((country, i) => <option key={i} value={country.country} >{country.country}</option>)}
                    </select>
                        : <h2 className="font-normal break-all">{session.country}</h2>}
                </div> */}
                <div className="flex items-center max-w-max space-x-4">
                    <h1>Balance:&nbsp; </h1>
                    <h2 className="inline-flex items-center text-lg font-normal"><Coin width="5" height="5" />{amount}</h2>
                </div>
                {/* <div className="flex items-center max-w-max space-x-4">
                    <h1>Referred user:&nbsp; </h1>
                    <h2 className="font-normal text-lg">{0} </h2>
                </div> */}
            </div>
            {session?.type === 'admin' &&
                <>
                    <hr className=" border-t-2 rounded-lg w-4/5 mx-auto" />
                    <div className={`p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto`}>
                        {userQuestions?.length <= 0 && <h1 className="text-3xl lg:text-4xl 2xl:text-5xl my-6 font-semibold text-gray-700 text-center">You've not contributed any question yet.</h1>}
                        {userQuestions?.length > 0 &&
                            <>
                                <h1 className="text-2xl sm:text-3xl font-semibold  text-gray-700 my-6 sm:px-5">My Questions</h1>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 question__group">
                                    {userQuestions?.map(item => (
                                        <Question key={item?._id} question={item} />
                                    ))}
                                </div>
                            </>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Portfolio
