import React from 'react';

class Pokemon extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      pokemonsObjects: []
    }
  }
  render () {
    // console.log(this.props.pokemon);
    // let urlPokemon = {`https://pokeapi.co/api/v2/pokemon/${this.props.id}/`};
    // fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.id}/`)
    // .then(response => response.json())
    //
    // .then(json => {
    //   this.setState({
    //     pokemonsObjects: json
    //   })
    // })
    // console.log(this.state.pokemonsObjects);
    return (
      <div>
        <div className="pokemon__container">
          <h2 className="pokemon__name">Nº {this.props.id}  {this.props.name} </h2>
          <img className="pokemon__image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`} alt= {this.props.name}/>
          {this.props.types}
        </div>
      </div>
    );
  }
}

export default Pokemon;
