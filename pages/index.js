import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import QuestionGroup from '../components/QuestionGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnBoard from '../components/OnBoard'

export default function Home({ questions, carouselList }) {
  const [onBoard, setOnBoard] = useState(false)

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('neuron-newUser'));
    if (data === true) {
      toast("🦄 Wow, You've won 1000 Neuron coins! 🥳", {
        position: "top-center",
        autoClose: 100000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOnBoard(true);
    }
    window.localStorage.setItem('neuron-newUser', false)
  }, [])


  const closeOnboard = () => {
    setOnBoard(false);
  }

  return (
    <>
      {onBoard && <OnBoard onSelect={closeOnboard} />}
      <div className="w-full flex flex-col pb-10">
        <Head>
          <title>The Neuron</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header carouselList={carouselList} />
        <QuestionGroup questions={questions?.trending} category={"Trending Topics"} />
        <QuestionGroup questions={questions?.newest} category={"New Topics"} />
      </div>
      <ToastContainer style={{ textAlign: 'center', zIndex: '49' }} />
    </>
  )
}

export async function getServerSideProps(context) {
  // const questions = await fetch('https://sample-api-data.vercel.app/api/tnc/questions').then((res) => res.json());
  const questions = await fetch(`${process.env.HOST}/api/question/ques`).then((res) => res.json());
  const carouselList = await fetch(`${process.env.HOST}/api/carousel`).then((res) => res.json());
  return {
    props: {
      questions,
      carouselList
    }
  }
}

