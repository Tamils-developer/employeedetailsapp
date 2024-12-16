import { useState } from "react";

export const useLocalStorage = (keyName:any, defaultValue:any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } 
    } catch (err) {
      return defaultValue;
    }
  });
  
  const setValue = (defaultValue:any) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(defaultValue));
      // console.log(keyName);
      
    } catch (err) {}
    setStoredValue(defaultValue);
  };
  return [storedValue, setValue];
};
