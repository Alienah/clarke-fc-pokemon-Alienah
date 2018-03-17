import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Details from './Details';

class Pokemon extends React.Component{

  render () {

    return (
      <div>

        <div className="pokemon__container">
          <div className="pokemon__image--container">
            <Link className="item-link" to='/details'><button className="pokemon__image" value={this.props.id} onClick={this.props.handleOnClickPokemon} style={{backgroundImage: `url(${this.props.imageURL})`}}>
              {/* <img className="pokemon__image"  src={this.props.imageURL} alt= {this.props.name}/> */}
            </button></Link>

          </div>
          <div className="pokemon__data">
            <h2 className="pokemon__title"><span className="pokemon__number">Nº {this.props.id}</span> <span className="pokemon__name">{this.props.name}</span> </h2>
            <ul className="pokemon__types--list">
              {this.props.types.map((type, index) =>
                <li key={index} className={`pokemon__type ${type}`}>
                  {type}
                </li>)}
            </ul>
            {this.props.evolves_from}
          </div>


        </div>
      </div>
    );
  }
}

export default Pokemon;
