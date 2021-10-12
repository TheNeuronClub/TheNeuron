import Head from "next/head";
import Steps from "../components/Steps";
import ScrollToTop from "../components/ScrollToTop";

function influencers() {
    const steps = [
        {
            no: 1,
            img: "/images/works/i1.svg",
            heading: "Post a question",
            desc: "Select a topic that matters to you. At TheNeuron.club (TNC) you get an opportunity to predict across wide range of topics curated by us everyday",
            sub_desc: [`Good questions are those where opinions are divided, with strong arguments on either side`, `Be the first one to pose a question on popular events. For duplicate questions posed, the one posted first is considered by the moderators to go live`]
        },
        {
            no: 2,
            img: "/images/works/i2.svg",
            heading: "Spread the word",
            desc: "Share the question amongst your friends and followers. The more people bet on it, the higher are your earnings",
            sub_desc: [`Your earnings grow with every new bet on your question. so spread the word as much as you can!`]
        },
        {
            no: 3,
            img: "/images/works/i3.svg",
            heading: "Relax and let the event unfold",
            desc: "Relax, grab a drink and track the results as the event unfolds. Once the event has been decided, update the question with results!",
            sub_desc: [`Update the question at the earliest so that the winnings can be disbursed`]
        }
    ]

    return (
        <>
            <Head>
                <title>The Neuron | Influencers</title>
            </Head>
            <div className="py-20 relative">
                <h1 className="mt-20 text-4xl md:text-5xl font-bold text-center text-gray-800">TheNeuron.Club for Influencers</h1>
                <h1 className="text-lg mx-auto md:text-xl max-w-6xl px-8 my-2 mb-8 text-center text-gray-600"> Join TheNueron.Club platform to run prediction contests amongst your followers and win rewards. Please contact us to signup on the platform as an influencer</h1>
                {/* <div className="h-1 w-60 mx-auto my-4 bg-gray-600"></div> */}
                <div className="min-h-screen gradient-shadow relative max-w-max mx-auto rounded-lg">
                    {steps.map(item => (<Steps key={item.no} step={item} type={"bid"} />))}
                </div>
            </div>
            <ScrollToTop />
        </>
    )
}

export default influencers
