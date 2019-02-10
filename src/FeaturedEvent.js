import React, { Component } from "react";
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

export default class FeaturedEvent extends Component {
  _style() {
    console.log(this.props.currentSelected);
    if (this.props.currentSelected == this.props.id) {
      return "event big";
    } else if (
      this.props.currentSelected > 0 &&
      this.props.id != this.props.currentSelected
    ) {
      return "hidden";
    } else {
      return "event";
    }
  }

  render() {
    const {
      id,
      changeSelected,
      eventName,
      genre,
      time,
      locationShort,
      description,
      image
    } = this.props;
    return (
      <>
        <div className={this._style()}>
          {this._style() == "event big" ? (
            <div
              onClick={() => {
                changeSelected(0);
              }}
              className="close"
            >
              <span className="mdi mdi-close" />
            </div>
          ) : (
            ""
          )}

          <div className="content">
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <small>{genre.toUpperCase()}</small>
              <h2>{eventName}</h2>
              <div className="tags">
                <div className="tag">
                  <span className="mdi mdi-clock-outline" />
                  {time}
                </div>
                <div className="tag">
                  <span className="mdi mdi-map-marker" />
                  {locationShort}
                </div>
              </div>

              {this._style() == "event big" ? (
                <div className="description">
                  <p>{description}</p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="buttons">
              {this._style() == "event big" ? (
                <a
                  onClick={() => {
                    changeSelected(0);
                  }}
                  className="button-hollow"
                >
                  <span>Close</span>
                </a>
              ) : (
                <a
                  onClick={() => {
                    changeSelected(id);
                  }}
                  className="button-hollow"
                >
                  <span>View</span>
                </a>
              )}

              <a href="http://intagram.com" target="_blank" className="button">
                Follow <span className="mdi mdi-instagram" />
              </a>
            </div>
          </div>
          <div className="imageContainer">
            <img height="100%;" width="100%;" src={image} />
          </div>
        </div>
      </>
    );
  }
}
