import { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon, LogoutIcon, ShareIcon, UserIcon, UsersIcon, XIcon } from "@heroicons/react/solid"
import Router from 'next/router'
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { useDispatch } from 'react-redux'
import { updateBalance } from '../slices/userBalance';
import { useSelector } from 'react-redux'
import { balance } from '../slices/userBalance';
import Coin from './Coin';
import Carousel from './Carousel';
import Loader from './Loader';
import { signOut } from 'next-auth/client'
import { motion } from 'framer-motion';
import { fadeOut, pageTransition, pageZoom } from '../util';

function UserDropDown({ session }) {
    const [isActive, setIsActive] = useState(false)
    const [isShare, setIsShare] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const dispatch = useDispatch();
    const amount = useSelector(balance)
    const urlSrc = `https://www.theneuron.club/account/register?referral_code=${session?.referral_code}`

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [isActive]);

    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${session?._id}`);
        console.log(res.status)
        if (res.status == 200) {
            const response = await res.json();
            dispatch(updateBalance(response?.balance))
        }
    }
    useEffect(() => {
        getUser();
    }, []);

    const userSignOut = () => signOut();
    const logout = async () => {
        setIsLoader(true)
        userSignOut();
        window.localStorage.setItem('neuron-token', '');
        const res = await fetch(`/api/account/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: session?._id })
        });
        if (res.status === 200) {
            location.reload();
        }
        setIsLoader(false)
    }
    const [carousel, setcarousel] = useState(false)

    const closeOnboard = () => {
        setcarousel(false);
    }

    return (
        <>
            {carousel && <Carousel onSelect={closeOnboard} />}
            {amount && <span className="inline-flex mr-2 items-center font-medium text-lg cursor-pointer" onClick={() => Router.push('/account/')}><Coin width="4" height="4" />{amount}</span>}
            <div className="relative font-medium">
                <div className="flex items-center p-1 bg-white rounded-full cursor-pointer text-blue-400" onClick={() => setIsActive(!isActive)}>
                    <div className="MuiAvatar-root MuiAvatar-circle gradient-bg text-white capitalize">
                        {session?.image_url ?
                            <img className="w-full h-full object-cover rounded-full" src={session?.image_url} alt="" />
                            : session?.name?.[0]}
                    </div>
                    {isActive ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </div>
                {isActive && <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={fadeOut}
                    transition={pageTransition} className="bg-white gradient-shadow-md absolute min-w-max rounded-md p-3 top-[130%] left-1/2 transform -translate-x-1/2">
                    <ul className="space-y-4 text-lg text-gray-500">
                        <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center" onClick={() => Router.push('/account/')}><UserIcon className="w-6 h-6 mr-1 text-gray-700" />Portfolio</li>
                        <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center" onClick={() => setIsShare(true)}><ShareIcon className="w-6 h-6 mr-1 text-gray-700" />Invite a Friend</li>
                        {session?.referral_code &&
                            <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center" onClick={() => setIsShare(true)}><UsersIcon className="w-6 h-6 mr-1 text-gray-700" />Refer: {session?.referral_code}</li>
                        }
                        <li onClick={logout} className="hover:text-gray-900 cursor-pointer transition-sm flex items-center"><LogoutIcon className="w-6 h-6 mr-1 text-gray-700" />Logout </li>
                    </ul>
                    <div className="bg-white absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-5 clip-path-sm"></div>
                </motion.div>
                }
            </div>

            {isShare &&
                <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full grid place-items-center z-50 bg-black bg-opacity-80" onClick={() => setIsShare(false)} >
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="relative max-w-sm md:max-w-md py-10 md:py-12 px-8 bg-white rounded-xl shadow-2xl m-4 flex items-center justify-center flex-wrap gap-4">
                            <XIcon className="h-8 w-8 md:w-10 md:h-10 absolute top-4 right-4 cursor-pointer active:scale-95 transition-sm text-gray-800" onClick={() => setIsShare(false)} />
                            <h1 className="text-gray-800 block w-full text-xl font-semibold">Invite a Friend &amp; Earn 500 Coins </h1>
                            <>
                                {window.innerWidth > 769 ?
                                    <>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <FacebookIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://twitter.com/share?text=${'Join The Neuron Club Now'}&url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <TwitterIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://web.whatsapp.com/send?text=${'Join The Neuron Club Now'}%20${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <WhatsappIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://www.pinterest.com/pin/create/button/?url=${urlSrc}&description=${'Join The Neuron Club Now'}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <PinterestIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://telegram.me/share/url?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <TelegramIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://www.reddit.com/submit?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <RedditIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <LinkedinIcon size={40} round={true} />
                                        </a>
                                    </>
                                    :
                                    <>
                                        <FacebookShareButton url={urlSrc} quote="Join The Neuron Club Now" >
                                            <FacebookIcon size={40} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={urlSrc} title="Join The Neuron Club Now" >
                                            <TwitterIcon size={40} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={urlSrc} separator=" " >
                                            <WhatsappIcon size={40} round={true} />
                                        </WhatsappShareButton>
                                        <PinterestShareButton url={urlSrc} description="Join The Neuron Club Now" media="https://www.theneuron.club/images/works/p1.svg" >
                                            <PinterestIcon size={40} round={true} />
                                        </PinterestShareButton>
                                        <TelegramShareButton url={urlSrc} title="Join The Neuron Club Now" >
                                            <TelegramIcon size={40} round={true} />
                                        </TelegramShareButton>
                                        <RedditShareButton url={urlSrc} title="Join The Neuron Club Now" >
                                            <RedditIcon size={40} round={true} />
                                        </RedditShareButton>
                                        <LinkedinShareButton url={urlSrc} title="Join The Neuron Club Now" source="https://www.theneuron.club" >
                                            <LinkedinIcon size={40} round={true} />
                                        </LinkedinShareButton>
                                    </>
                                }
                            </>
                        </motion.div>
                    </div>
                </>
            }
            {isLoader && <div className=" w-full h-full bg-white bg-opacity-80 grid place-items-center fixed top-0 right-0">
                <Loader />
            </div>}
        </>
    )
}

export default UserDropDown
