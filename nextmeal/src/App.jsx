import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import NeedFoodNow from "./components/NeedFoodNow";

function App() {
  const [page, setPage] = useState("landing");
  const [zipCode, setZipCode] = useState("");

  const goToFood = (enteredZip) => {
    setZipCode(enteredZip);
    setPage("food");
  };

  if (page === "food") {
    return <NeedFoodNow zipCode={zipCode} goBack={() => setPage("landing")} />;
  }

  return <LandingPage goToFood={goToFood} />;
}

export default App;