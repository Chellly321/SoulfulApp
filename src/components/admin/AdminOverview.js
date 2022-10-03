import { useState } from "react";
import Users from "./Users";
import Content from "./Content";
import Contacts from "./Contacts";
import Subscription from "./Subscription";
import { Link } from "react-router-dom";

const btnData = [
  { id: 1, title: "User Overview" },
  { id: 2, title: "Content" },
  { id: 3, title: "Subscription" },
  { id: 4, title: "Contacts" },
];

function AdminOverview() {
  const [btnId, setBtnId] = useState(1);
  const handleButtonClick = (id) => {
    setBtnId(id);
  };
  return (
    <div className="admin-overview-container">
      <div className="admin-overview-container__side-menu">
        {btnData.map((btn) => (
          <button
            key={btn.id}
            style={{ border: btn.id === btnId ? `3px solid #b9926b` : null }}
            onClick={() => handleButtonClick(btn.id)}
          >
            {btn.title}
          </button>
        ))}
        <Link to="dashboard">
          <button className="dashboard-btn">Dashboard</button>
        </Link>
      </div>
      <div className="admin-overview-container__users">
        {btnId === 1 && <Users />}
        {btnId === 2 && <Content />}
        {btnId === 3 && <Subscription />}
        {btnId === 4 && <Contacts />}
      </div>
    </div>
  );
}

export default AdminOverview;
