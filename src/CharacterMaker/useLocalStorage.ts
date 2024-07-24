import { useEffect } from "react";

export const useLocalStorage = (key: string, value: string) => {
    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);
};
