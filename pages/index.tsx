import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';

type HomeProps = {
  text: string;
}

export default function Home(props: HomeProps) {
  useEffect(()=> {
    axios.get('/api/test').then( res => {
      console.log(res.data)
    })
  }, [])
  return (
    <>
      <Head>
        <title>home</title>
      </Head>
      <main className='h-screen w-screen flex flex-col justify-center items-center'>
        <div>
          <h3 className="bg-zinc-200 inline-block py-3 px-10 rounded-md text-red-500">{props.text}</h3>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let text: string = "soon"
  return {
    props: {
      text
    }
  }
}