import React from 'react';
import Pokemon from './Pokemon';

class Home extends React.Component{

  //Condición para que sólo devuelva el que evoluciona de otro pokemon
  handleEvolution (pokemon){
    if (pokemon.species.evolves_from_species != null) {
      return (
        <div className="pokemon__evolves"><span className="pokemon-evolves-from">Evolves from  </span> <span className="evolves-from--value"> {pokemon.species.evolves_from_species.name}</span>
        </div>
      )
    }
    else {
      return ('')
    }
  }

  paintPokemons () {
    let listOfPokemons = this.props.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.props.inputSearch));

    if(this.props.loading === true){
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
                      evolves_from={this.handleEvolution(pokemon)}
                      handleOnClickPokemon={this.props.handleOnClickPokemon}
                    />
                  </li>
              )
            }
          </ul>
      );
    }
  }

  render (){
    return (
       <div className="main__inside">
         <p className="app-intro">
           Find your favorite Pokémon in our list.
         </p>
         <input className="app-search" placeholder="Filter by name" value={this.props.inputSearch} onChange={this.props.handleSearchInput}/>
         {this.paintPokemons()}
       </div>
    )
  }
}

export default Home;
