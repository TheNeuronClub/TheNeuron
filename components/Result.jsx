import { useEffect, useState } from 'react'

const User = ({ data, rank }) => {
    const [user, setUser] = useState()
    useEffect(() => {
        fetch(`/api/getUser?_id=${data?._id?.userId}`).then((res) => res.json()).then(data => setUser(data)).catch(e => console.log(e));
    }, [])

    return (
        <>
            {user && <div className='blur-blue flex items-center gap-x-2 p-2 sm:px-4 rounded-lg w-full max-w-3xl mt-8 mx-auto cursor-pointer transform hover:scale-[1.01] transition-all duration-200 ease-out'>
                <div className='shrink-0 p-1'>
                    <div className="MuiAvatar-root MuiAvatar-circle btn-blue !shadow text-white capitalize">
                        {user?.image_url?.length > 2 ?
                            <img className="w-full h-full object-cover rounded-full" src={user?.image_url} alt="" />
                            : user?.name?.[0]}
                    </div>
                </div>
                <div className="flex-1 p-1 font-medium text-sm sm:text-lg">
                    <p className='text-white'>{`${user?.name}`}</p>
                    <p className='text-xs sm:text-sm font-light text-gray-100'>Investment: {data?.totalAmount} coins</p>
                </div>
                <span className='text-lg sm:text-xl font-semibold text-gray-50'># Rank {rank}</span>
            </div>}
        </>
    )
}

function Result({ rankList }) {
    return (
        <section className='p-5 max-w-4xl mx-auto'>
            <h1 className="text-center mb-3 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl sm:leading-none">
                Oscar Contest Results 🎉
            </h1>
            {rankList?.map((user, i) => <User data={user} key={i} rank={i + 1} />)}
        </section>
    )
}

export default Result