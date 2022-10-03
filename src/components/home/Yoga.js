import React, { Fragment } from "react";
import YogaCard from "../../common/YogaCard";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";


const override = {
  display: "block",
  margin: "2rem auto auto auto",
  borderColor: "#f3dcc6",
};

function Yoga() {
  const [yogaData, setYogaData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://lightning-yoga-api.herokuapp.com/yoga_poses"
    );
    const data = await response.json();
    setYogaData(data.items);
  };

  return (
    <Fragment>
      <h1 className="yoga-styles-heading">Yoga Oefeningen</h1>
      <div className="yoga-container">
        {yogaData.length ? (
          yogaData.map(({ img_url, yoga_categories }) => (
            <YogaCard
              key={img_url}
              pic={img_url}
              title={yoga_categories[0].name}
              text={yoga_categories[0].description}
            />
          ))
        ) : (
          <BarLoader
            color="#8b6743"
            loading={yogaData.length === 0}
            cssOverride={override}
            size={150}
            height={5}
            width={200}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Yoga;
