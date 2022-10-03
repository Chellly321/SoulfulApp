import pic from "../../assets/images/picture.png";
import {Link} from "react-router-dom";

function About() {

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
    <div className="about-container">
      <div>
        <img src={pic} alt="about-pic" className="about-pic" />
      </div>
      <div>
        <h1>Wie ben ik?</h1>
        <p>
            Hallo, Wat fijn dat je er bent! Ik zal me even voorstellen,
        </p>
        <p>
            Mijn naam is Gytha Brooks (30), mama van Elijah (4) en eigenaresse van SOULFUL.
        </p>
        <p>
            Binnen SOULFUL ben ik, speciaal voor vrouwen in alle levensfases, werkzaam als yogalerares en masseuse. Ook voor ontspannende behandelingen en coaching rondom zwangerschap en kraamtijd kun je bij mij terecht.
            Neem een kijkje op de Website en ontdek wat SOULFUL voor jou kan betekenen.
            Voel je welkom om contact met mij op te nemen als je vragen hebt of een afspraak in zou willen plannen.
        </p>
           <Link to="/about">
               <button>
                   Meer lezen...
               </button>
           </Link>
      </div>
    </div>
  );
}

export default About;
