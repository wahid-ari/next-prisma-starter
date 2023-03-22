const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const artists_data = [
  {
    id: 1,
    name: 'Noah',
    cover_url: 'https://i.scdn.co/image/ab6761610000e5eba8fe25ec607f3cca02f5db6c',
    genre_id: 1,
  },
  {
    id: 2,
    name: 'Guns n Roses',
    cover_url: 'https://i.scdn.co/image/ab67616d0000b2734e04404c40be7b80855656a8',
    genre_id: 2,
  },
  {
    id: 3,
    name: 'Coldplay',
    cover_url: 'https://i.scdn.co/image/ab67616d00001e02b151437d4adc97ce6c828d4a',
    genre_id: 3,
  },
];

const genres_data = [
  {
    id: 1,
    name: 'Pop',
  },
  {
    id: 2,
    name: 'Rock',
  },
  {
    id: 3,
    name: 'Alternative',
  },
];

const albums_data = [
  {
    id: 1,
    name: 'Bintang di Surga',
    cover: 'https://i.scdn.co/image/ab67616d00001e02af69d9e82cc973f608481610',
    artists_id: 1,
  },
  {
    id: 2,
    name: 'Hari yang Cerah',
    cover: 'https://i.scdn.co/image/ab67616d00001e02076747ead143aa3cd8c1d2f0',
    artists_id: 1,
  },
  {
    id: 3,
    name: 'Use Your Illusion I',
    cover: 'https://i.scdn.co/image/ab67616d00001e022ab85e10aa698513679ff509',
    artists_id: 2,
  },
  {
    id: 4,
    name: 'A Head Full of Dreams',
    cover: 'https://i.scdn.co/image/ab67616d00001e028ff7c3580d429c8212b9a3b6',
    artists_id: 3,
  },
];

const songs_data = [
  {
    id: 1,
    name: 'Hari Yang Cerah',
    youtube_url: 'fuEdMCclYn0',
    cover_url: 'https://i.scdn.co/image/ab67616d00001e02076747ead143aa3cd8c1d2f0',
    preview_url: 'https://p.scdn.co/mp3-preview/08bd5940bc2031c8c93306cccb32d5b9756fdc53',
    artist_id: 1,
    album_id: 2,
  },
  {
    id: 2,
    name: 'Ada Apa Denganmu',
    youtube_url: 'sEM01iNOSQA',
    cover_url: 'https://i.scdn.co/image/ab67616d00001e02af69d9e82cc973f608481610',
    preview_url: 'https://p.scdn.co/mp3-preview/c6e19c3e7e0af8cf26f54b41468b1b0121166f11',
    artist_id: 1,
    album_id: 1,
  },
  {
    id: 3,
    name: 'Dont Cry',
    youtube_url: 'zRIbf6JqkNc',
    cover_url: 'https://i.scdn.co/image/ab67616d0000b273bdba586eb69c503f7ff7d658',
    preview_url: 'https://p.scdn.co/mp3-preview/34a693fa6d6a033cb0b2f8b4828a0e6781db7729',
    artist_id: 2,
    album_id: 3,
  },
  {
    id: 4,
    name: 'A Head Full Of Dreams',
    youtube_url: 'vGZMvV9KBp8',
    cover_url: 'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6',
    preview_url: 'https://p.scdn.co/mp3-preview/a5de5c8bb9e27204d232b6e62b23a82d4cc5a7d9',
    artist_id: 3,
    album_id: 4,
  },
];

async function main() {
  console.log(`Start seeding Genre.`);
  for (const a of genres_data) {
    const genre = await prisma.genre.create({
      data: a,
    });
    console.log(`Created genre with id: ${genre.id}`);
  }
  console.log(`Seeding Genre Finished.`);

  console.log(`Start seeding Artist.`);
  for (const a of artists_data) {
    const artist = await prisma.artists.create({
      data: a,
    });
    console.log(`Created artist with id: ${artist.id}`);
  }
  console.log(`Seeding Artist Finished.`);

  console.log(`Start Seeding Album.`);
  for (const row of albums_data) {
    const album = await prisma.album.create({
      data: row,
    });
    console.log(`Created album with id: ${album.id}`);
  }
  console.log(`Seeding Album Finished.`);

  console.log(`Start Seeding Song.`);
  for (const s of songs_data) {
    const song = await prisma.songs.create({
      data: s,
    });
    console.log(`Created song with id: ${song.id}`);
  }
  console.log(`Seeding Song Finished.`);

  console.log(`All Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1)
  });

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
