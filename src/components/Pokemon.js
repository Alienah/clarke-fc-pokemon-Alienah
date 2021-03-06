import React from 'react';
import { Link } from 'react-router-dom';

class Pokemon extends React.Component{

  render () {
    return (
      <div>
        <div className="pokemon__container">
          <div className="pokemon__image--container">
            <Link className="item-link" to={`/details/${this.props.id}`}>
              <img className="pokemon__image" src={this.props.imageURL} alt= {this.props.name}/>
            </Link>
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
