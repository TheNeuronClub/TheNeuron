import Head from 'next/head'
import CarouselSetting from "../components/CarouselSetting";
import ContestSetting from '../components/ContestSetting';
import QCategorySetting from "../components/QCategorySetting";

function setting({ carouselList, category, contest }) {
    return (
        <>
            <Head><title>The Neuron Club | Setting</title></Head>
            <div className="w-full min-h-screen p-5 md:p-10 relative">
                <QCategorySetting category={category} /> <br />
                <CarouselSetting carouselList={carouselList} /> <br />
                <ContestSetting contest={contest} category={category} /> <br />
            </div>
        </>
    )
}

export default setting

export async function getServerSideProps() {
    const carouselList = await fetch(`${process.env.HOST}/api/carousel`).then((res) => res.json());
    const category = await fetch(`${process.env.HOST}/api/question/queCategory`).then((res) => res.json());
    const contest = await fetch(`${process.env.HOST}/api/contest`).then((res) => res.json());
    return {
        props: {
            carouselList, category, contest
        }
    }
}
