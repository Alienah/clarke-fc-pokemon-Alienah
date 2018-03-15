import React from 'react';
import './../scss/main.css';
// import Pokemon from './Pokemon';
import Logo from './../images/logo.png';
import Details from './Details';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);
    // this.handleEvolution = this.handleEvolution.bind(this);

    this.state = {
      pokemons: [],
      inputSearch: "",
      evolution: [],
      loading: false
    }
  }

  componentDidMount () {
    this.setState({
      loading: true
    })

    // fetch(`https://pokeapi.salestock.net/api/v2/pokemon?limit=2`)
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
        loading: false
      });
      console.log(this.state.pokemons);
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

      //Introducimos una nueva propiedad "evolution" en cada objeto
       pokemonsArray.map((poke) => {
         if(poke.id === speciesJson.id){
           poke["species"] = speciesJson;
         };
         this.setState({
           pokemons: pokemonsArray
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

  // //Condición para que sólo devuelva el que evoluciona de otro pokemon
  // handleEvolution (pokemon){
  //   if (pokemon.species.evolves_from_species != null) {
  //     return (
  //       <div className="pokemon__evolves"><span className="pokemon-evolves-from">Evolves from </span> <span className="evolves-from--value">{pokemon.species.evolves_from_species.name}</span>
  //       </div>
  //     )
  //   }
  //   else {
  //     return ('')
  //   }
  // }

  // paintPokemons () {
  //   let listOfPokemons = this.state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.inputSearch));
  //
  //   if(this.state.loading === true){
  //     return(
  //       <div className="loader"></div>
  //     );
  //   }
  //   else if(listOfPokemons.length === 0){
  //     return(
  //     <div className="pokemon__results-message">
  //       No hay resultados que coincidan con su búsqueda.
  //     </div>)
  //   }
  //   else{
  //     return(
  //         <ul className="pokemon__list">
  //           {
  //             listOfPokemons.sort(function(a,b) {
  //             return a.id - b.id;}).map(
  //               (pokemon) =>
  //                 <li key={pokemon.id}>
  //                   <Pokemon
  //                     id={pokemon.id}
  //                     name={pokemon.name}
  //                     types= {pokemon.types.sort((typeNumber) => typeNumber.slot).map((typeNumber) => typeNumber.type.name)}
  //                     imageURL={pokemon.sprites.front_default}
  //                     evolves_from={this.handleEvolution(pokemon)}
  //                   />
  //                 </li>
  //             )
  //           }
  //         </ul>
  //     );
  //   }
  // }

  render() {
    // console.log(this.state.pokemons)
    return (
      <div className="app">
        <header className="app-header">
          <img className="logo" src={Logo} alt="logo"/>
          <h1 className="app-title">PokeDex</h1>
          <nav>
						<ul className="menu__list">
							<li><Link className="item-link" to='/'>Home</Link></li>
							<li><Link className="item-link" to='/details'>Details</Link></li>
						</ul>
					</nav>
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
            }/> />
            <Route path='/details' render={() =>
              <Details
                // id={pokemon.id}
                // name={pokemon.name}
                // types= {pokemon.types.sort((typeNumber) => typeNumber.slot).map((typeNumber) => typeNumber.type.name)}
                // imageURL={pokemon.sprites.front_default}
                // evolves_from={this.handleEvolution(pokemon)}
              />
            }/>
          </Switch>
          {/* <div className="main__inside">
            <p className="app-intro">
              Find your favorite Pokemon in our list.
            </p>
            <input className="app-search" placeholder="Filter by name" value={this.state.inputSearch} onChange={this.handleSearchInput}/>
            {this.paintPokemons()}
          </div> */}
        </main>
      </div>
    );
  }
}

export default App;
