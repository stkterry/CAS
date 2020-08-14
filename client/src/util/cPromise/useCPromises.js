import { useRef } from "react";

const useCPromises = () => {
  const pendingPromises = useRef([]);

  const appendPendingPromise = promise => 
    pendingPromises.current = [...pendingPromises.current, promise];

  const removePendingPromise = promise => 
    pendingPromises.current = pendingPromises.current.filter(p => p !== promise);
    
  const clearPendingPromises = () => pendingPromises.current.map(p => p.cancel());

  const API = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises
  };

  return API;
};

export default useCPromises;