import React from 'react';

class Details extends React.Component{
  render () {
    return (
      <div className="details__container">
        {/* <div className="details__title-container">
          <h2 className="pokemon__title"><span className="pokemon__number">Nº {this.props.id}</span> <span className="pokemon__name">{this.props.name}</span></h2>
          </div>
          <ul className="pokemon__types--list">
          {this.props.types.map((type, index) =>
            <li key={index} className={`pokemon__type ${type}`}>
          {type}
            </li>)}
        </ul> */}
        <div>
          <h3 className="details__subtitle">PROFILE</h3>
          <ul className="details__list">
            <li><span className="details__key">Height</span> <span className="details__value"></span></li>
            <li><span className="details__key"></span> <span className="details__value"></span></li>
            <li><span className="details__key"></span> <span className="details__value"></span></li>
          </ul>
        </div>

      </div>
    );
  }
}

export default Details;
