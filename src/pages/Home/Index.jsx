import React from "react";
import Header from "../../components/Header/Header";
import Venues from "../../components/Venues";
import VenuesV2 from "../../components/VenuesV2/VenuesV2";
import "./Home.module.scss";

function Home() {
  return (
    <div>
      <Header />
      <VenuesV2 />
      {/* <Venues /> */}
    </div>
  );
}

export default Home;
