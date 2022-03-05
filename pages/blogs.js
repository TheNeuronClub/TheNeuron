import Head from 'next/head'
import Blogs from '../components/Blogs'

export default function blogs({ posts }) {
  return (
    <>
      <Head>
        <title>The Neuron Club | Blogs</title>
      </Head>
      <Blogs />
    </>
  )
}
