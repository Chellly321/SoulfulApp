function SelectedModule({ selectedModule }) {
  return (
    <div className="selected-module-container" id="selected-module-id">
      <div className="selected-module-container__content">
        <h1>
          {selectedModule.length > 0 ? `${selectedModule[0].module}` : "Module"}
        </h1>
        <p>{selectedModule.length > 0 && selectedModule[0].text} </p>
      </div>
    </div>
  );
}

export default SelectedModule;
