import Image from 'next/image'
import Head from 'next/head'

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 | Page Not Found</title>
            </Head>
            <div className="w-full pt-28 min-h-[550px] grid place-items-center p-10">
                <div className="relative w-full h-full">
                    <Image src="/images/error.svg" layout="fill" objectFit="contain" />
                </div>
            </div>
        </>
    )
}