import React from 'react';

class Pokemon extends React.Component{
  render () {
    return (
      <div>
        <div className="pokemon__container">
          <h2 className="pokemon__name"> {this.props.pokemon.name} </h2>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`} alt= {this.props.pokemon.name}/>
        </div>
      </div>
    );
  }
}

export default Pokemon;
