const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Currency Converter
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <form className="d-flex" onSubmit={(e) => props.handleSubmit(e)}>
            <input
              className="form-control me-2"
              type="text"
              name="searchInput"
              defaultValue="hkd"
              placeholder="Currency code..."
              aria-label="Search"
            />
            <input
              className="form-control me-2"
              type="number"
              defaultValue="1"
              min="0"
              name="valueInput"
              placeholder="Amount to convert..."
              aria-label="Search"
            />
            <button className="btn btn-success" type="submit">
              Convert
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
