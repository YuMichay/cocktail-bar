import { useStore } from "../stores/store";

export const getRandomSlot = () => {
  const { ImageStore, GameStore } = useStore();
  const randomNumber = Math.floor(Math.random() * ImageStore.slots.length);
  GameStore.slotsIds.push(randomNumber);

  return ImageStore.slots[randomNumber];
}