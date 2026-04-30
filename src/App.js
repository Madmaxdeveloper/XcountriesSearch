import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ countries: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { countries, searchTerm } = this.state;

    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={this.handleSearch}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {filtered.map((country) => (
            <div
              key={country.name}
              className="countryCard"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                textAlign: "center",
                width: "120px",
              }}
            >
              <img
                src={country.flag}
                alt={country.name}
                style={{ width: "80px", height: "60px", objectFit: "cover" }}
              />
              <p>{country.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
