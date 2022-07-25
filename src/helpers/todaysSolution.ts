import { songs, startDate } from "../constants";

const msInDay = 86400000;
const todaysDate = new Date();
const index = Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay)

export const todaysSolution = songs[index % songs.length];
