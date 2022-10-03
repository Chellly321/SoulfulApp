import Card from "../../common/Card";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

function Modules({ moduleBg, showTitle }) {
  const history = useHistory();

  const [cardId, setCardId] = useState(null);
  const location = useLocation();
  const [courseData, setCourseData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getCourses();
  }, []);

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

  const onCardClick = (id) => {
    setCardId(id);
    if (!currentUser) {
      alert("Om verder te gaan moet je eerst inloggen!");
    } else {
      location.pathname === "/account"
          ? history.push(`/account#${id}`)
          : history.push(`/course/${id}`);
      scrollToContent();
    }
  };

  const scrollToContent = () => {
    const selectedModule = document.getElementById("selected-module-id");

    if (selectedModule) {
      selectedModule.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
      <div className="modules-container" style={{ backgroundColor: moduleBg }}>
        {showTitle && <h1>Modules</h1>}

        <div className="card-container">
          {courseData.length > 0 &&
              courseData.map((data) => (
                  <Card
                      text={data.content}
                      btnText={`$${data.price}`}
                      cardBorder={data.id === cardId ? "#8b6743" : "white"}
                      onCardClick={() => onCardClick(data.id)}
                  />
              ))}
        </div>
      </div>
  );
}

export default Modules;
