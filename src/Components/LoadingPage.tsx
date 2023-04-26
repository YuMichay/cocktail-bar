import { useStore } from "../stores/store"

export const LoadingPage = () => {
  const { ImageStore } = useStore();

  return <div className="loading"><img src={`${ImageStore.images.loadingImage}`} alt="loading"></img></div>
}