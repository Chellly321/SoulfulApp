import AdminOverview from "../components/admin/AdminOverview";
import Navbar from "../common/Navbar";
import { Fragment, useEffect } from "react";
import { useHistory } from "react-router";
import Heading from "../common/Heading";
import Footer from "../common/Footer";
import { useAuth } from "../context/AuthContext";

function Admin() {
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
    }
  }, [history, currentUser]);

  return (
    <Fragment>
      <Navbar />
      <Heading headingTitle="Admin Overview" headingTopMargin={true} />
      <AdminOverview />
      <Footer />
    </Fragment>
  );
}

export default Admin;
