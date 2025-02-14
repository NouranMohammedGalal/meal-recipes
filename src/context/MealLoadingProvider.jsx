import React, { createContext, useState } from "react";
export const MealLoadingContext = createContext();
export default function MealLoadingProvider({ children }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  return (
    <MealLoadingContext.Provider value={{ isFirstLoad, setIsFirstLoad }}>
      {children}
    </MealLoadingContext.Provider>
  );
}
