import { Fragment } from "react";
import Navbar from "../common/Navbar";
import AboutDetail from "../components/aboutus/AboutDetail";
import Footer from "../common/Footer";

function Aboutus() {
  return (
    <Fragment>
      <Navbar />
      <AboutDetail />
      <Footer />
    </Fragment>
  );
}

export default Aboutus;
