import React from 'react';
import { Link } from 'react-router-dom';
import CloseButton from './../images/closebtn.png';

class Details extends React.Component{
  componentDidMount(){
    this.props.pokemon ? this.props.pokemon.id : '' ;
  }

  render () {
    if (this.props.pokemon[0] == undefined) {
      return(
        <div className="details__outside">
          <div className="details__container error-msg">
            <div className="details-not-found--msg">We can't show you the details of this Pokémon right now, please come back to Home and click on another Pokémon from the list.</div>
            <Link className="item-link" to='/'><button className="btnclose" style={{ backgroundImage: `url(${CloseButton})` }}></button></Link>
          </div>
        </div>
          );
    } else {

    return (
      <div className="details__outside">
        <div className="details__container">

          <div className="details__title-container">
            <h2 className="pokemon__title"><span className="pokemon__number">Nº {this.props.pokemon[0].id}</span> <span className="pokemon__name">{this.props.pokemon[0].name}</span></h2>
            <Link className="item-link" to='/'><button className="btnclose" style={{ backgroundImage: `url(${CloseButton})` }}></button></Link>
          </div>
          <ul className="pokemon__types--list">

            {this.props.pokemon[0].types.sort((typeNumber) => typeNumber.slot).map((typeNumber) => typeNumber.type.name).map((type, index) =>
              <li key={index} className={`pokemon__type ${type}`}>
                {type}
              </li>)}
          </ul>
          <div className="more-info__container">
            <h3 className="details__subtitle">PROFILE</h3>
            <ul className="details__list">
              <li className="details__list-item"><span className="details__key">Height:</span> <span className="details__value">{this.props.pokemon[0].height}</span></li>
              <li className="details__list-item"><span className="details__key">Weight:</span> <span className="details__value">{this.props.pokemon[0].weight}</span></li>
              <li className="details__list-item details__key">Abilities:
                <ul className="abilities__list">
                  {this.props.pokemon[0].abilities.sort((abilityEntry) => abilityEntry.slot).map((abilityEntry) => abilityEntry.ability.name).map((ability, index) =>
                    <li className="details__value" key={index} className={` ${ability}`}>
                      {ability}
                    </li>)}
                </ul>
              </li>
            </ul>
            <div>
              <h3 className="details__subtitle">IMAGES</h3>
              <div className="delails__image--container">
                <img src={this.props.pokemon[0].sprites.front_default} alt="front default" className={this.props.pokemon[0].sprites.front_default ? 'visible' : 'invisible'}/>
                <img src={this.props.pokemon[0].sprites.back_default} alt="back_default" className={this.props.pokemon[0].sprites.back_default ? 'visible' : 'invisible'}/>
                <img src={this.props.pokemon[0].sprites.front_female} alt="front_female" className={this.props.pokemon[0].sprites.front_female ? 'visible' : 'invisible'}/>
                <img src={this.props.pokemon[0].sprites.back_female} alt="back_female" className={this.props.pokemon[0].sprites.back_female ? 'visible' : 'invisible'}/>
                <img src={this.props.pokemon[0].sprites.front_shiny} alt="front_shiny" className={this.props.pokemon[0].sprites.front_shiny ? 'visible' : 'invisible'}/>
                <img src={this.props.pokemon[0].sprites.back_shiny} alt="back_shiny" className={this.props.pokemon[0].sprites.back_shiny ? 'visible' : 'invisible'}/>
                <img src={this.props.pokemon[0].sprites.front_shiny_female} alt="front_shiny_female" className={this.props.pokemon[0].sprites.front_shiny_female ? 'visible' : 'invisible'}/>
                <img src={this.props.pokemon[0].sprites.back_shiny_female} alt="back_shiny_female" className={this.props.pokemon[0].sprites.back_shiny_female ? 'visible' : 'invisible'}/>
              </div>
            </div>
            <div className="delails__evolution--container">
              <h3 className="details__subtitle">EVOLUTION CHAIN</h3>
              <div className="evolution--section">
                <span className="evolution--name">{this.props.pokemon[0].evolution.chain.species.name}</span> evolves to
                <span className="evolution--name">{this.props.pokemon[0].evolution.chain.evolves_to[0].species.name}</span>
                <div>
                  at level
                  <span>{this.props.pokemon[0].evolution.chain.evolves_to[0].evolution_details[0].min_level}</span>
                </div>
              </div>
              <div className="evolution--section">
                <span className="evolution--name">{this.props.pokemon[0].evolution.chain.evolves_to[0].species.name}</span>
                evolves to
                <span className="evolution--name">{this.props.pokemon[0].evolution.chain.evolves_to[0].evolves_to[0].species.name}</span>
                <div>
                  at level
                  <span>{this.props.pokemon[0].evolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );}
  }
}

export default Details;
