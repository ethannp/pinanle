import { songs } from "../constants";
import { Song } from "../types/song";

export function searchSong(searchTerm: string) {
  const cleanedSearchTerm = searchTerm.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  const terms = cleanedSearchTerm.split(" ")
  const sortedSongs = songs.sort((a,b) => (a.name > b.name) ? 1 : -1)
  const matchedSongs = sortedSongs
    .filter((song: Song) => {
      const songName = song.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const songArtist = song.artist.toLowerCase().replace(/[^a-z0-9]/g, "");
      let valid = true;
      if (cleanedSearchTerm.replace(/[^a-z0-9 ]/g,"") == (songArtist + songName)) {
        return [];
      }
      for (const term of terms) {
        if (!(songArtist + songName).includes(term)) {
          valid = false;
        }
      }
      if (valid) {
        return song;
      }
    })
    .sort((a, b) =>
      a.artist.toLowerCase().localeCompare(b.artist.toLocaleLowerCase())
    );
  return matchedSongs;
}
