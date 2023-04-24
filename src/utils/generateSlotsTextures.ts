import { Texture } from "pixi.js";
import { useStore } from "../store/store";

const getRandomSlot = () => {
  const { ImageStore, GameStore } = useStore();
  const randomNumber = Math.floor(Math.random() * ImageStore.slots.length);
  GameStore.slotsIds.push(randomNumber);

  return ImageStore.slots[randomNumber];
}

export const generateSlotsTextures = () => {
  const slots = []
  for (let i = 0; i < 5; i++) {
    slots.push([Texture.from(getRandomSlot()), Texture.from(getRandomSlot()), Texture.from(getRandomSlot()), Texture.from(getRandomSlot()), Texture.from(getRandomSlot())]);
  }
  return slots;
}