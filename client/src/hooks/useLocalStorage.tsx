import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue?: string) => {
  const [value, setValue] = useState<string>(
    window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key) || "")
      : initialValue
  );

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
    // eslint-disable-next-line
  }, [value]);

  return [value, setValue];
};
