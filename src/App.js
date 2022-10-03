import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./pages/404";
import Contactus from "./pages/Contactus";
import About from "./pages/Aboutus";
import Courses from "./pages/Courses";
import ScrollToTop from "./helper/scrollToTop";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import CourseDetail from "./pages/CourseDetail";
import ExerciseOverview from "./pages/ExerciseOverview";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contactus} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/course/:id" component={CourseDetail} />
          <Route exact path="/exerciseoverview" component={ExerciseOverview} />

        <Route component={PageNotFound} />
      </Switch>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
