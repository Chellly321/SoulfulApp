import Graph from "../../common/Graph";

function Studenten() {
  return (
    <div className="studenten-container">
      <h1>
        Studenten <br /> <span>Overzicht</span>
      </h1>
      <div className="graph-container">
        <Graph displayXLine={true} displayYLine={true} reponsive={true} />
      </div>
    </div>
  );
}

export default Studenten;
