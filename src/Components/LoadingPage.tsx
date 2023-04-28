import { observer } from "mobx-react";
import { useStore } from "../stores/store"

export const LoadingPage = observer(() => {
  const { ImageStore } = useStore();

  return <div className="loading"><img src={`${ImageStore.images.loadingImage}`} alt="loading"></img></div>
})