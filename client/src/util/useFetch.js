import { useEffect } from "react";

export default fetcher => {
  useEffect(() => {
    fetcher();
  }, [])
}