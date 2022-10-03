import { Fragment, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import Profile from "../components/account/Profile";
import Modules from "../components/home/Modules";
import Theory from "../components/account/Theory";
import SelectedModule from "../components/account/SelectedModule";
import VideoContent from "../components/account/VideoContent";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function Account() {
  const [selectedCourse, setSelectedCourse] = useState([]);
  const location = useLocation();
  const { currentUser } = useAuth();
  const history = useHistory();
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    if (currentUser === null) {
      history.push("/");
    }
    getCourses();
    //eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    const pathArray = location.hash.split("#");

    if (courseData.length > 0) {
      const courseArray = [];
      courseData.forEach((data) => {
        if (data.id === pathArray[1]) {
          courseArray.push({
            text: data.content,
            module: data.price,
            theory: data.theory,
            video: data.videoURL,
          });
        }
      });
      setSelectedCourse(courseArray);
    }
    //eslint-disable-next-line
  }, [location.hash, history]);

  const getCourses = () => {
    let docData = [];
    let courses = {};
    const coursesRef = collection(db, "courses");
    onSnapshot(coursesRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        courses = { ...doc.data(), id: doc.id };
        docData.push(courses);
      });
      setCourseData(docData);
    });
  };

  return (
    <Fragment>
      <Navbar />
      <Profile />
      <Heading headingTitle="Mijn overzicht" />
      <Modules showTitle={false} moduleBg="white" />
      <SelectedModule selectedModule={selectedCourse} />
      <Theory selectedModule={selectedCourse} />
      <VideoContent selectedModule={selectedCourse} />
      <Footer />
    </Fragment>
  );
}

export default Account;
