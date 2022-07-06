const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const artistData = [
  {
    name: 'Noah',
    genre: 'Pop',
    coverUrl: 'https://i.scdn.co/image/ab6761610000e5eba8fe25ec607f3cca02f5db6c',
  },
  {
    name: 'Guns n Roses',
    genre: 'Rock',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734e04404c40be7b80855656a8',
  },
]

const songData = [
  {
    name: 'Hari Yang Cerah',
    youtubeId: 'fuEdMCclYn0',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d00001e02076747ead143aa3cd8c1d2f0',
    artistId: 1
  },
  {
    name: 'Bintang Di Surga',
    youtubeId: 'B1ynHmn0XZ4',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d00001e02af69d9e82cc973f608481610',
    artistId: 1
  },
  {
    name: 'Taman Langit',
    youtubeId: 'EzcuhqJKlLk',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d0000b27324496b7707e9304c4ad76c5a',
    artistId: 1
  },
  {
    name: 'Separuh Aku',
    youtubeId: 'b0ZBBjViV8Y',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d0000b273aa994128eba603922ce924a0',
    artistId: 1
  },
  {
    name: 'My Situation',
    youtubeId: 'aYPXy6kE1GA',
    albumCoverUrl: 'https://i.scdn.co/image/ab67706c0000bebb8d82e2ee27cd5b4018e5f480',
    artistId: 1
  },
  {
    name: 'Sweet Child of Mine',
    youtubeId: '1w7OgIMMRc4',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d0000b273e44963b8bb127552ac761873',
    artistId: 2
  },
  {
    name: 'November Rain',
    youtubeId: '8SbUC-UaAxE',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d0000b27368384dd85fd5e95831252f60',
    artistId: 2
  },
  {
    name: 'Dont Cry',
    youtubeId: 'zRIbf6JqkNc',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d0000b273bdba586eb69c503f7ff7d658',
    artistId: 2
  },
  {
    name: 'Patience',
    youtubeId: 'ErvgV4P6Fzc',
    albumCoverUrl: 'https://i.scdn.co/image/ab67706c0000da8483d2a5bf0a60bf11cd408a3b',
    artistId: 2
  },
  {
    name: 'Civil War',
    youtubeId: 'isCh4kCeNYU',
    albumCoverUrl: 'https://i.scdn.co/image/ab67616d00001e0255598d2d52fc249fa166a3ca',
    artistId: 2
  },
]

async function main() {
  console.log(`Start seeding Artist...`)
  for (const a of artistData) {
    const artist = await prisma.artist.create({
      data: a,
    })
    console.log(`Created artist with id: ${artist.id}`)
  }

  console.log(`Start seeding Song...`)
  for (const s of songData) {
    const song = await prisma.song.create({
      data: s,
    })
    console.log(`Created song with id: ${song.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })