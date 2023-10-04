import { createDatabase, insertCongresses } from "./app/database/database";
import React, { useEffect } from "react";
import Main from "./app/index";

export default function App() {
  useEffect(() => {
    createDatabase();
    insertCongresses()
  }, []);
  return <Main />;
}
