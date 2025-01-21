import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  f2c: () => {}, // Fahrenheit to celcius
  mph2ms: () => {},
});

export const ContextProvider = ({ children }) => {
  const f2c = (val = 0, unit = "") => {
    if (val == 0) return { value: "0.0", unit: unit };
    const temp = (val - 32) * (5 / 9);
    // fahrenheit - 32) * 5/9
    return { value: temp.toFixed(1), unit: "℃" };
  };
  const mph2ms = (val = 0, unit = "") => {
    if (val == 0) return { value: "0.0", unit: unit };
    const speedy = val * 0.447
    // fahrenheit - 32) * 5/9
    return { value: speedy.toFixed(1), unit: "m/s" };
  };

  return (
    <StateContext.Provider value={{ f2c, mph2ms }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
