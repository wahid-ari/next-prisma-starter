const { PrismaClient } = require('@prisma/client');
const { genre, artist, album, song, playlist, playlist_song,
  playlist_user,
  playlist_user_song,
  admin } = require('./data8');
const prisma = new PrismaClient();

async function main() {
  console.log(`Start Seeding Admin.`);
  for (const row of admin) {
    const data = await prisma.admin.create({
      data: row,
    });
    console.log(`Created Admin with id: ${data.id}`);
  }
  console.log(`Seeding Admin Finished.`);
  
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

  console.log(`Start Seeding Playlist.`);
  for (const row of playlist) {
    const data = await prisma.playlist.create({
      data: row,
    });
    console.log(`Created Playlist with id: ${data.id}`);
  }
  console.log(`Seeding Playlist Finished.`);
  
  console.log(`Start Seeding Playlist Song.`);
  for (const row of playlist_song) {
    const data = await prisma.playlist_song.create({
      data: row,
    });
    console.log(`Created Playlist Song with id: ${data.id}`);
  }
  console.log(`Seeding Playlist Song Finished.`);
  
  console.log(`Start Seeding Playlist User.`);
  for (const row of playlist_user) {
    const data = await prisma.playlist_user.create({
      data: row,
    });
    console.log(`Created Playlist User with id: ${data.id}`);
  }
  console.log(`Seeding Playlist User Finished.`);
  
  console.log(`Start Seeding Playlist User Song.`);
  for (const row of playlist_user_song) {
    const data = await prisma.playlist_user_song.create({
      data: row,
    });
    console.log(`Created Playlist User Song with id: ${data.id}`);
  }
  console.log(`Seeding Playlist User Song Finished.`);

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
