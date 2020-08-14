import useCPromises from "./cPromise/useCPromises";
import { cPromise, cDelay } from "./cPromise/cPromise";

const useClickPrevention = (onClick, onDoubleClick, delay=300) => {
  const API = useCPromises();

  const handleClick = () => {
    API.clearPendingPromises();
    const waitForClick = cPromise(cDelay(delay));
    API.appendPendingPromise(waitForClick);

    return waitForClick.promise
     .then(() => {
       API.removePendingPromise(waitForClick);
       onClick();
     })
     .catch(error => {
       API.removePendingPromise(waitForClick);
       if (!error.isCanceled) throw error.error;
     });
  }

  const handleDoubleClick = () => {
    API.clearPendingPromises();
    onDoubleClick();
  }

  return [handleClick, handleDoubleClick];
};

export default useClickPrevention;