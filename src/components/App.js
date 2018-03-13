import React from 'react';
import './../scss/main.css';
import Pokemon from './Pokemon';
import Logo from './../images/logo.png';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);

    this.state = {
      pokemons: [],
      inputSearch: "",
      loading: false
    }
  }

  componentDidMount () {
    this.setState({
      loading: true
    })
    for (let i = 1; i < 6; i++) {
      // fetch(`https://pokeapi.salestock.net/api/v2/pokemon/${i}/`)
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then(response => response.json())

      .then(json => {
        this.setState({
          pokemons: this.state.pokemons.concat([json]),
          loading: false
        })
      }).catch(() =>{
        alert('No es posible recuperar los datos actualmente. Vuelva a intentarlo más tarde.')
      })
    }
  }

  handleSearchInput (e) {
    const inputValue = e.target.value.toLowerCase();

    this.setState({
      inputSearch: inputValue
    })
  }

  paintPokemons () {
    let listOfPokemons = this.state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.inputSearch));

    return(
      <ul className="pokemon__list">
        {
          listOfPokemons.sort(function(a,b) {
          return a.id - b.id;}).map(
            (pokemon) =>
              <li key={pokemon.id}>
                <Pokemon
                  id={pokemon.id}
                  name={pokemon.name}
                  types= {pokemon.types.sort((typeNumber) => typeNumber.slot).map((typeNumber) => typeNumber.type.name)}
                  imageURL={pokemon.sprites.front_default}
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
      <div className="app">
        <header className="app-header">
          <img className="logo" src={Logo} alt="logo"/>
          <h1 className="app-title">PokeDex</h1>
        </header>
        <main className="main">
          <div className="main__inside">
            <p className="app-intro">
              Find your favorite Pokemon in our list.
            </p>
            <input className="app-search" placeholder="Filter by name" value={this.state.inputSearch} onChange={this.handleSearchInput}/>
            {this.paintPokemons()}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
