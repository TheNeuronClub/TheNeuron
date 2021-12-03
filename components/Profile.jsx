import { userSession } from "../lib/user-session"
import { useSelector } from "react-redux";
import { balance } from '../slices/userBalance';
import Coin from "./Coin";
import { PencilIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import { useRef, useEffect, useState } from "react";
import Question from "./Question";

function Profile() {
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
        if (image?.size < 5000000) {
            setIsUpdating(true)
            const formData = new FormData();
            formData.append("image", image);
            formData.append("email", data.email);
            formData.append("_id", session?._id);
            formData.append("name", data.name);
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
    }

    const [userQuestions, setUserQuestions] = useState()

    const getQuestion = async () => {
        const res = await fetch(`/api/question/ques?type=expiring`);
        console.log(res.status)
        const response = await res.json();
        setUserQuestions(response)
    }
    useEffect(() => {
        getQuestion();
    }, []);


    return (
        <>
            <div className="min-h-[220px] w-full max_w_3xl relative blur-blue">
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
                    {(image?.size > 5000000) && <p className="text-red-400 text-sm my-2 lg:text-lg">Maximum image upload size must be 5MB </p>}
                    {isEdit ?
                        <>
                            <div className="flex">
                                <button className="px-4 py-2 text-lg lg:text-xl text-gray-50 rounded-xl font-semibold hover:text-green-500 transition-sm items-center inline-flex" disabled={isUpdating} onClick={updateUser}>{isUpdating ? 'Updating...' : <><CheckIcon className="w-6 mr-1" />Update </>}</button>
                                <button className="px-4 py-2 text-lg lg:text-xl text-gray-50 rounded-xl font-semibold hover:text-red-500 transition-sm items-center inline-flex" disabled={isUpdating} onClick={() => setIsEdit(false)}> <XIcon className="w-6 mr-1" />Cancel</button>
                            </div>
                        </>
                        :
                        <button className="px-5 py-3 text-lg lg:text-xl text-white rounded-xl font-semibold hover:text-yellow-300 transition-sm flex items-center" onClick={() => setIsEdit(true)}> <PencilIcon className="w-6 mr-1" />Edit Profile</button>
                    }
                </div>
            </div>
            <div className="flex flex-col justify-start w-full max-w-max gap-y-4 gap-x-6 md:gap-y-6 md:gap-x-8 xl:gap-x-10 text-xl lg:text-2xl mx-auto font-medium px-10 pt-28 lg:pt-32 pb-5">
                <div className="flex items-center max-w-max space-x-2">
                    <h1 className="text-white">Name:&nbsp; </h1>
                    {isEdit ? <input type="text" name="name" onChange={handleChange} value={data.name} className="outline-none text-lg h-10 px-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" /> : <h2 className="font-normal text-lg text-gray-50 break-all">{session?.name}</h2>}
                </div>
                <div className="flex items-center max-w-max space-x-2">
                    <h1 className="text-white">Email:&nbsp; </h1>
                    <h2 className="font-normal break-all text-lg text-gray-100">{session?.email}</h2>
                </div>
                <div className="flex items-center max-w-max space-x-2">
                    <h1 className="text-white">Referral Code:&nbsp; </h1>
                    <h2 className="font-normal break-all text-lg text-gray-100">{session?.referral_code}</h2>
                </div>
                <div className="flex items-center max-w-max space-x-2">
                    <h1 className="text-white">Balance:&nbsp; </h1>
                    <h2 className="inline-flex items-center text-lg font-normal text-white"><Coin width="5" height="5" />{amount}</h2>
                </div>
            </div>
            {session?.type === 'admin' &&
                <>
                    <hr className=" border-t-2 rounded-lg w-4/5 mx-auto" />
                    <div className={`p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto`}>
                        {userQuestions?.length <= 0 && <h1 className="text-3xl lg:text-4xl 2xl:text-5xl my-6 font-semibold text-white text-center">You've not contributed any question yet.</h1>}
                        {userQuestions?.length > 0 &&
                            <>
                                <h1 className="text-2xl sm:text-3xl font-semibold  text-white my-6 sm:px-5">My Questions</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 place-items-center items-stretch question__group">
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

export default Profile
