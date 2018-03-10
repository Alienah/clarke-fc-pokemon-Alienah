import React from 'react';

class Pokemon extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      pokemonsObjects: []
    }
  }
  render () {

    return (
        <div className="pokemon__container">
          <h2 className="pokemon__name">Nº {this.props.id}  {this.props.name} </h2>
          <img className="pokemon__image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`} alt= {this.props.name}/>
          <ul className="pokemon__types--list">
            {this.props.types.map((type, index) =>
              <li key={index} className="pokemon__type">
                {type}
              </li>)}
          </ul>
        </div>
    );
  }
}

export default Pokemon;
