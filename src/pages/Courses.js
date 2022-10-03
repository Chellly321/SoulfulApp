import { Fragment, useEffect } from "react";
import Navbar from "../common/Navbar";
import CourseOverview from "../components/courses/CourseOverview";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import Modules from "../components/home/Modules";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function Courses() {
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  return (
    <Fragment>
      <Navbar />
      <Heading headingTitle="Lesstof " headingTopMargin={true} />
      <CourseOverview />
      <Modules showTitle={false} moduleBg="white" />
      <Footer />
    </Fragment>
  );
}

export default Courses;
