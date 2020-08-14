import { reject } from "lodash";
export const cPromise= promise => {
  let isCanceled = false;

  const wrapper = new Promise((res, rej) => {
    promise.then(
      value => (isCanceled ? reject({ isCanceled, value }) : res(value)),
      error => reject({ isCanceled, error })
    );
  });

  return {
    promise: wrapper,
    cancel: () => (isCanceled = true)
  }
}

export const cDelay = n => new Promise(res => setTimeout(res, n));