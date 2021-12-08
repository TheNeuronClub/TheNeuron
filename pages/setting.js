import CarouselSetting from "../components/CarouselSetting";
import QCategorySetting from "../components/QCategorySetting";

function setting({ carouselList, category }) {
    return (
        <>
            <div className="w-full min-h-screen p-5 md:p-10 relative">
                <QCategorySetting category={category} />
                <CarouselSetting carouselList={carouselList} />
            </div>
        </>
    )
}

export default setting

export async function getServerSideProps() {
    const carouselList = await fetch(`${process.env.HOST}/api/carousel`).then((res) => res.json());
    const category = await fetch(`${process.env.HOST}/api/question/queCategory`).then((res) => res.json());
    return {
        props: {
            carouselList, category
        }
    }
}
