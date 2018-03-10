import React from 'react';
import './../scss/main.css';
import Pokemon from './Pokemon';

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
    for (let i = 1; i < 26; i++) {
      fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${i}/`)
      // fetch(`http://pokeapi.co/api/v2/pokemon/${i}/`)
      .then(response => response.json())

      .then(json => {
        this.setState({
          pokemons: this.state.pokemons.concat([json])
        })
      })
    }

  }

  handleSearchInput (e) {
    const inputValue = e.target.value.toLowerCase();

    this.handleSearchInput = this.handleSearchInput.bind(this);

    this.setState({
      inputSearch: inputValue
    })
  }

  paintPokemons () {
    let listOfPokemons = this.state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.inputSearch));

    return(
      <ul className="pokemon__list">
        {
          listOfPokemons.sort((idNumber) => idNumber.id).map(
            (pokemon) =>
              <li key={pokemon.id}>
                <Pokemon
                  id={pokemon.id}
                  name={pokemon.name}
                  types= {pokemon.types.sort((typeNumber) => typeNumber.slot).map((typeNumber) => typeNumber.type.name)}
                />
              </li>
          )
        }
      </ul>
    );
  }

  render() {
    console.log(this.state.pokemons)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PokeDex</h1>
        </header>
        <main>
          <p className="App-intro">
            Find your favorite Pokemon in our list.
          </p>
          <input className="App-search" placeholder="Filter by name" value={this.state.inputSearch} onChange={this.handleSearchInput}/>
          {this.paintPokemons()}
        </main>
      </div>
    );
  }
}

export default App;
