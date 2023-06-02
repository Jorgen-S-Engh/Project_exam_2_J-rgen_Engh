import React from "react";
import Header from "../../components/Header/Header";
import Venues from "../../components/Venues";
import "./Home.module.scss";

function Home() {
  return (
    <div>
      <Header />
      <Venues />
    </div>
  );
}

export default Home;
