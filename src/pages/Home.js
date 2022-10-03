import Navbar from "../common/Navbar";
import Header from "../components/home/Header";
import { Fragment } from "react";
import Testimonial from "../components/home/Testimonial";
import Modules from "../components/home/Modules";
import About from "../components/home/About";
import Subscribe from "../components/home/Subscribe";
import Footer from "../common/Footer";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";

function Home() {
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.auth.currentUser.email === "admin@soulful.com") {
        history.push("/admin");
      } else {
        history.push("/account");
      }
    }
  }, [history, currentUser]);


  return (
    <Fragment>
      <Navbar />
      <Header />
      <Testimonial />
      <Modules showTitle={true} />
      <About />
      <Subscribe />
      <Footer />
    </Fragment>
  );
}

export default Home;
