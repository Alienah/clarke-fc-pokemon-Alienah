import React from 'react';
import './../scss/main.css';
import Logo from './../images/logo.png';
import Details from './Details';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);

    this.state = {
      pokemons: [],
      inputSearch: "",
      loading: false,
    }
  }

  componentDidMount () {
    this.setState({
      loading: true
    })

    // fetch(`https://pokeapi.salestock.net/api/v2/pokemon?limit=2`)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=9`, {
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
  }

  //Preparo la llamada a la url de cada pokemon para ejecutarla cuando tenga el valor del parámetro e introduzco posteriomente los valores en elarray de pokemons
  getPokemonByUrl(url) {
    fetch(url)
    .then(response => response.json())
    .then(pokeResponse => {
      //Ejecuto la función para acceder a la url de la evolucion de cada pokemon con el parámetro id
      this.getEvolution(pokeResponse.id);
      this.setState({
        pokemons: this.state.pokemons.concat([pokeResponse]),
        loading: true
      });
    })
    .catch((err) =>{
        alert('No es posible recuperar los datos actualmente. Vuelva a intentarlo más tarde.');
        console.error(err);
      })
  }

  getEvolution(id) {
    // fetch(`http://pokeapi.salestock.net/api/v2/pokemon-species/${id}/`)
     fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
     .then(response => response.json())
     .then(speciesJson => {
       const pokemonsArray = this.state.pokemons;

      //Introducimos una nueva propiedad "species" en cada objeto
       pokemonsArray.map((poke) => {
         if(poke.id === speciesJson.id){
           poke["species"] = speciesJson;
         };
         this.setState({
           pokemons: pokemonsArray,
           loading: true
         })
       });
       return fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
     })
     .then(response => response.json())
     .then(evolutionChainJson => {
       const pokemonsArray = this.state.pokemons;

      //Introducimos una nueva propiedad "evolution" en cada objeto
       pokemonsArray.map((poke) => {
         if(poke.species.evolution_chain.url === `https://pokeapi.co/api/v2/evolution-chain/${id}/`){
           poke["evolution"] = evolutionChainJson;
         };
         this.setState({
           pokemons: pokemonsArray,
           loading: false
         })
       });
     })
   }

  handleSearchInput (e) {
    const inputValue = e.target.value.toLowerCase();
    this.setState({
      inputSearch: inputValue
    })
  }

  //Condición para que sólo devuelva el que evoluciona de otro pokemon
  handleEvolution (pokemon){
    if (pokemon.species.evolves_from_species != null) {
      return (
        <div className="pokemon__evolves"><span className="pokemon-evolves-from">Evolves from </span> <span className="evolves-from--value">{pokemon.species.evolves_from_species.name}</span>
        </div>
      )
    }
    else {
      return ('')
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img className="logo" src={Logo} alt="logo"/>
          <h1 className="app-title">PokéDex</h1>
        </header>
        <main className="main">
          <Switch>
            <Route exact path='/' render={() =>
              <Home
                paintPokemons = {this.paintPokemons}
                pokemons = {this.state.pokemons}
                loading = {this.state.loading}
                inputSearch = {this.state.inputSearch}
                handleSearchInput = {this.handleSearchInput}
              />
            }/>
            <Route path='/details/:id' render={(props) =>
              <Details
                paintDetails = {this.paintDetails}
                pokemons = {this.state.pokemons}
                pokemon = {this.state.pokemons.filter(pokemon => pokemon.id == props.match.params.id)}
              />
            }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
