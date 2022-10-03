import { Line } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

Chart.register(...registerables);

function Graph({ displayXLine, displayYLine, responsive }) {
  const [graphData, setGraphData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Maart",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Dataset",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "#EED8B5",
        borderColor: "#8B6743",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 0.8,
        pointRadius: 0,
        borderWidth: 3,
        pointHitRadius: 10,
        data: graphData,
      },
    ],
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  const getUserData = () => {
    let janUsers = [];
    let febUsers = [];
    let maartUsers = [];
    let aprilUsers = [];
    let meiUsers = [];
    let junUsers = [];
    let juliUsers = [];
    let augUsers = [];
    let sepUsers = [];
    let oktUsers = [];
    let novUsers = [];
    let decUsers = [];
    const usersRef = collection(db, "users");
    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().createdAt === "Jan") {
          janUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Feb") {
          febUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Maart") {
          maartUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Apr") {
          aprilUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Mei") {
          meiUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Jun") {
          junUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Jul") {
          juliUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Aug") {
          augUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Sep") {
          sepUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Okt") {
          oktUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Nov") {
          novUsers.push(doc.data().email);
        } else if (doc.data().createdAt === "Dec") {
          decUsers.push(doc.data().email);
        }
        let newGraphData = [...graphData];
        newGraphData[0] = janUsers.length;
        newGraphData[1] = febUsers.length;
        newGraphData[2] = maartUsers.length;
        newGraphData[3] = aprilUsers.length;
        newGraphData[4] = meiUsers.length;
        newGraphData[5] = junUsers.length;
        newGraphData[6] = juliUsers.length;
        newGraphData[7] = augUsers.length;
        newGraphData[8] = sepUsers.length;
        newGraphData[9] = oktUsers.length;
        newGraphData[10] = novUsers.length;
        newGraphData[11] = decUsers.length;
        setGraphData(newGraphData);
      });
    });
  };

  return (
    <Line
      data={data}
      options={{
        responsive,
        maintainAspectRatio: false,
        legend: false,
        plugins: { legend: { display: false } },

        scales: {
          x: {
            display: displayXLine,
          },
          y: {
            display: displayYLine,
            position: "right",
          },
        },
      }}
    />
  );
}

export default Graph;
