import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);

    this.state = {
      pokemons: [],
      inputSearch: ""
    }
  }

  componentDidMount () {
    fetch('http://pokeapi.salestock.net/api/v2/pokemon/')
    .then(response => response.json())

    .then(json => {
      this.setState({
        pokemons: json.results
      })
    })
  }

  handleSearchInput (e) {
    const inputValue = e.target.value.toLowerCase();

    this.handleSearchInput = this.handleSearchInput.bind(this);

    this.setState({
      inputSearch: inputValue
    })
  }

  paintPokemons () {
    let listOfPokemons = this.state.pokemons;
    console.log(listOfPokemons);

    return(
      <ul>
        {
          listOfPokemons.map(
            (pokemonItem) =>
              <li key={pokemonItem.name}>
                {pokemonItem.name}
              </li>

          )
        }
      </ul>
    );
  }

  render() {
    // console.log(this.state.pokemons)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PokeList</h1>
        </header>
        <main>
          <p className="App-intro">
            Find your favorite Pokemon in our list.
          </p>
          <input value={this.state.inputSearch} onChange={this.handleSearchInput}/>
          {this.paintPokemons()}
        </main>
      </div>
    );
  }
}

export default App;
