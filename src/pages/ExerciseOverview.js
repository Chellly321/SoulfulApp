import {Fragment} from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Yoga from "../components/home/Yoga";
import Heading from "../common/Heading";


function ExerciseOverview() {
    return(
        <Fragment>
            <Navbar />
            <Heading headingTitle="Yoga Oefeningen"/>
            <Yoga />
            <Footer />

        </Fragment>
    )
}

export default ExerciseOverview;