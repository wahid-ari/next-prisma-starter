const { PrismaClient } = require('@prisma/client');
const { genre, artist, album, song } = require('./data');
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding Genre.`);
  for (const row of genre) {
    const data = await prisma.genre.create({
      data: row,
    });
    console.log(`Created genre with id: ${data.id}`);
  }
  console.log(`Seeding Genre Finished.`);

  console.log(`Start seeding Artist.`);
  for (const row of artist) {
    const data = await prisma.artists.create({
      data: row,
    });
    console.log(`Created artist with id: ${data.id}`);
  }
  console.log(`Seeding Artist Finished.`);

  console.log(`Start Seeding Album.`);
  for (const row of album) {
    const data = await prisma.album.create({
      data: row,
    });
    console.log(`Created album with id: ${data.id}`);
  }
  console.log(`Seeding Album Finished.`);

  console.log(`Start Seeding Song.`);
  for (const row of song) {
    const data = await prisma.songs.create({
      data: row,
    });
    console.log(`Created song with id: ${data.id}`);
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
  });
