function Theory({ selectedModule }) {
  return (
    <div className="theory-container">
      <div className="theory-container__content">
        <h1>Theorie</h1>
        <p>{selectedModule.length > 0 && selectedModule[0].theory}</p>
      </div>
    </div>
  );
}

export default Theory;
