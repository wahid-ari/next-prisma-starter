import Head from 'next/head'
import { useContext } from "react";
import { GlobalContext } from "@utils/GlobalContext";
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany({
    include: { artist: true }
  });

  return {
    props: {
      songs
    }
  };
}

export default function Home({ songs}) {
  const { darkMode, setDarkMode } = useContext(GlobalContext);

  return (
    <>
      <Head>
        <title>Songs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dark:bg-neutral-900 min-h-screen p-8 md:p-12">
        <div className="max-w-lg mx-auto">

          <nav className="flex justify-between mb-8 gap-x-4">
            <Link href="/">
              <span className="text-blue-500 hover:text-blue-600 font-medium transition-all hover:cursor-pointer">Songs</span>
            </Link>
            <Link href="/artists">
              <span className="text-blue-500 hover:text-blue-600 font-medium transition-all hover:cursor-pointer">Artists</span>
            </Link>
            <div onClick={() => setDarkMode(!darkMode)} className="transition-all cursor-pointer w-12 h-7 dark:bg-blue-500 bg-neutral-200 rounded-full relative">
              <div className="h-5 w-5 bg-white rounded-full absolute top-1 transition-all dark:left-6 left-1"></div>
            </div>
          </nav>

          <h1 className="text-neutral-700 dark:text-gray-100 text-2xl font-bold">Song List</h1>

          <div className="mt-8">
            {songs.map(song =>
              <div key={song.id} className="border dark:border-neutral-800 rounded my-2">
                <Link href={`song/${song.id}`}>
                  <div className="group">
                    <div className="flex items-center gap-4 transition duration-300 hover:cursor-pointer">
                      <div className="relative h-16 sm:h-24 w-16 sm:w-24">
                        <Image
                          alt={song.name}
                          src={song.albumCoverUrl}
                          className="rounded"
                          layout='fill'
                        />
                      </div>
                      <div className="p-2">
                        <h2 className="text-md sm:text-lg font-medium dark:text-white text-neutral-800 mb-2 group-hover:text-blue-500 transition duration-300">{song.name}</h2>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-gray-300">{song.artist.name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  )
}
