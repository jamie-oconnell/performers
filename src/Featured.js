import React, { Component } from "react";
import FeaturedEvent from "./FeaturedEvent";

export default class Featured extends Component {

  showFeatured() {

    const {currentSelected, events, changeSelected} = this.props;

    if (currentSelected === 0) {
      return events
        .filter(event => {
          return event.featured === true;
        })
        .map(event => {
          return (
            <FeaturedEvent
              key={event.id}
              {...event}
              currentSelected={currentSelected}
              changeSelected={changeSelected}
            />
          );
        });
    } else {
      return events
        .filter(event => {
          return event.id === currentSelected;
        })
        .map(event => {
          return (
            <FeaturedEvent
              key={event.id}
              {...event}
              currentSelected={currentSelected}
              changeSelected={changeSelected}
            />
          );
        });
    }
  }

  render() {
    return (
      <div>
        <div className="featured">
          {this.props.currentSelected === 0 ? (
            <div className="heading">
              <h1>Featured</h1>
            </div>
          ) : (
            ""
          )}

          {this.showFeatured()}
        </div>
      </div>
    );
  }
}
