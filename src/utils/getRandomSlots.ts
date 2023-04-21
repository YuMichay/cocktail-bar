import { useStore } from "../store/store";

export const getRandomSlot = () => {
  const { ImageStore } = useStore();

  return ImageStore.slots[Math.floor(Math.random() * ImageStore.slots.length)];
}