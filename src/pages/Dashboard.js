import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import Testimonial from "../components/home/Testimonial";
import Studenten from "../components/dashboard/Studenten";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.auth.currentUser.email !== "admin@soulful.com") {
        history.push("/account");
      }
    }
  }, [history, currentUser]);

  return (
    <section className="dashboard-section">
      <Navbar navBg="#F6E9DC" />
      <Heading headingTitle="Dashboard" headingTopMargin={true} />
      <Testimonial testimonialBg="#F4E1CE" />
      <Studenten />
      <Footer />
    </section>
  );
}

export default Dashboard;
