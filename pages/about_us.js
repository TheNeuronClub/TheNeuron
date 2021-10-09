import Image from "next/image";
import Head from "next/head";
import ProfileCard from "../components/ProfileCard";

function about_us() {
    return (
        <>
        <Head>
          <title>The Neuron | About Us</title>
        </Head>
            <div className="py-20 w-full">
                <h1 className="mt-10 text-4xl md:text-6xl font-bold text-gray-700 text-center leading-snug md:leading-normal">TheNeuron.club </h1>
                <p className="text-lg text-gray-500 px-5 max-w-2xl mx-auto text-center">is the next generation betting platform that allows users to be on the outcome of a wide range of events. Sign up is now open for early access!</p>
                <div className="relative md:w-3/5 h-[400px] sm:h-[500px] mx-auto">
                    <Image src="/images/neuron.svg" layout="fill" objectFit="contain" />
                </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-700 text-center leading-snug md:leading-normal">
                Our awesome team
            </h1>
            <p className="text-lg text-gray-500 px-5 max-w-2xl mx-auto text-center"> Our team and our shared values are our right to play in this business</p>
            <div className="max-w-7xl mx-auto p-10 pb-20 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
            </div>
        </>
    )
}

export default about_us
