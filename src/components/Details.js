import React from 'react';

class Details extends React.Component{

  render () {

    return (
      <div className="details__container">

        <div className="details__title-container">
          <h2 className="pokemon__title"><span className="pokemon__number">Nº {this.props.pokemon[0].id}</span> <span className="pokemon__name">{this.props.pokemon[0].name}</span></h2>
        </div>
        <ul className="pokemon__types--list">

          {this.props.pokemon[0].types.sort((typeNumber) => typeNumber.slot).map((typeNumber) => typeNumber.type.name).map((type, index) =>
            <li key={index} className={`pokemon__type ${type}`}>
              {type}
            </li>)}
        </ul>
        <div>
          <h3 className="details__subtitle">PROFILE</h3>
          <ul className="details__list">
            <li><span className="details__key">Height:</span> <span className="details__value">{this.props.pokemon[0].height}</span></li>
            <li><span className="details__key">Weight:</span> <span className="details__value">{this.props.pokemon[0].weight}</span></li>
            <li>
              <ul className="details__key pokemon__types--list">Abilities:
                {this.props.pokemon[0].abilities.sort((abilityEntry) => abilityEntry.slot).map((abilityEntry) => abilityEntry.ability.name).map((ability, index) =>
                  <li className="details__value" key={index} className={` ${ability}`}>
                    {ability}
                  </li>)}
              </ul>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

export default Details;
