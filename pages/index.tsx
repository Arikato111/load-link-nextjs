import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'

type HomeProps = {
  text: string;
}

export default function Home(props: HomeProps) {
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