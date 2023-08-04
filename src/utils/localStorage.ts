export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const storage = window.localStorage.getItem(key) || "";

    try {
      return JSON.parse(storage);
    } catch (e) {
      // console.log(`Error while parsing localstorage data "${storage}"`, e);
      return null;
    }
  }
};

export const setToLocalStorage = <T>(key: string, data: T) => {
  if (typeof window !== "undefined") {
    const parsedData = typeof data === "string" ? data : JSON.stringify(data);
    window.localStorage.setItem(key, parsedData);
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};
