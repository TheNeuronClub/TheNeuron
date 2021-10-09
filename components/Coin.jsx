import Image from "next/image"

function Coin({ width, height }) {
    return (
        <>
            <div className={`relative inline-block mr-1 w-${width} h-${height}`}>
                <Image src="/images/coin.jpg" layout="fill" className="rounded-full w-4 h-4" />
            </div>
        </>
    )
}

export default Coin
