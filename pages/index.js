import Head from 'next/head'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Header from '../components/Header'
import QuestionGroup from '../components/QuestionGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from '../components/Carousel'

export default function Home({ questions }) {
  const [isNewUser, setIsNewUser] = useState(false)

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
      setIsNewUser(true);
    }
    window.localStorage.setItem('neuron-newUser', false)
  }, [])

  return (
    <>
      {isNewUser && <Carousel />}
      <div className="w-full flex flex-col pb-10">
        <Head>
          <title>The Neuron</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <QuestionGroup questions={questions?.trending} category={"Trending Topics"} />
        <QuestionGroup questions={questions?.newest} category={"New Topics"} />
      </div>
      <ToastContainer style={{ textAlign: 'center' }} onClick={() => Router.push('/account/')} />
    </>
  )
}

export async function getServerSideProps() {
  // const questions = await fetch('https://sample-api-data.vercel.app/api/tnc/questions').then((res) => res.json());
  const questions = await fetch(`${process.env.HOST}/api/question/ques`).then((res) => res.json());
  return {
    props: {
      questions
    }
  }
}

