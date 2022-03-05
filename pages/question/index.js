import Head from "next/head";
import QuestionList from '../../components/QuestionList'
import { useRouter } from "next/router";

function index({ categories }) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>The Neuron Club | Questions</title>
            </Head>
            <QuestionList categories={categories} category={router.query?.category || ''} />
        </>
    )
}

export default index

export async function getServerSideProps() {
    // const data = await fetch(`${process.env.HOST}/api/question/get_questions`).then(res => res.json());
    const categories = await fetch(`${process.env.HOST}/api/question/queCategory`).then((res) => res.json());
    return {
        props: {
            categories
        }
    }
}