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

    // fetch(`https://pokeapi.salestock.net/api/v2/pokemon/${i}/`)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=2`, {
      method: 'get'
    })
    .then(response => response.json())
    .then(firstList => {
      this.handleResponse(firstList);
    })
  }
  
  //Uso el json transformado del fetch en componentDidMount y lo uso como parámetro para esta función y así obtengo con un mapeo de results, las url
  handleResponse(firstList){
    const getAllPokeDatas = firstList.results.map(poke => this.getPokemonByUrl(poke.url));
    console.log(getAllPokeDatas);
  }

  //Preparo la llamada a la url de cada pokemon para ejecutarla cuando tenga el valor del parámetro e introduzco posteriomente los valores en elarray de pokemons
  getPokemonByUrl(url) {
    fetch(url)
    .then(response => response.json())
    .then(pokeResponse => {
      console.log(pokeResponse);
      this.setState({
        pokemons: this.state.pokemons.concat([pokeResponse]),
        loading: false
      });
      console.log(this.state.pokemons);
    })
    .catch((err) =>{
        alert('No es posible recuperar los datos actualmente. Vuelva a intentarlo más tarde.');
        console.error(err);
      })
  }

  // getEvolution() {
  //   fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}/`)
  //   .then(response => response.json())
  //   .then(evolutionJson => {
  //
  //   })
  // }

  handleSearchInput (e) {
    const inputValue = e.target.value.toLowerCase();

    this.setState({
      inputSearch: inputValue
    })
  }

  paintPokemons () {
    let listOfPokemons = this.state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.inputSearch));

    if(this.state.loading === true){
      return(
        <div className="loader"></div>
      );
    }
    else if(listOfPokemons.length === 0){
      return(
      <div className="pokemon__results-message">
        No hay resultados que coincidan con su búsqueda.
      </div>)
    }
    else{
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
  }

  render() {
    // console.log(this.state.pokemons)
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
