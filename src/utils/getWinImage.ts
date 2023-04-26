import { ImageCount } from "./interfaces";

export const getWinImage = (slotsIds: number[]): ImageCount => {
  const counts: ImageCount = {};

  slotsIds.forEach((id) => {
    if (counts[id]) {
      counts[id]++;
    } else {
      counts[id] = 1;
    }
  });
  
  const repeatedIds: ImageCount = {};
  
  for (const id in counts) {
    if (counts[id] >= 7) {
      repeatedIds[id] = counts[id];
    }
  }

  return repeatedIds;
}