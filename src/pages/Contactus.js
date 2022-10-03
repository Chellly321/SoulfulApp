import { Fragment } from "react";
import Navbar from "../common/Navbar";
import ContactDetail from "../components/contactus/ContactDetail";
import Footer from "../common/Footer";

function Contactus() {
  return (
    <Fragment>
      <Navbar />
      <ContactDetail />
      <Footer />
    </Fragment>
  );
}

export default Contactus;
