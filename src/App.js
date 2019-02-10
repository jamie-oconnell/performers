import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
// import mapboxgl from "mapbox-gl";
import markerImg from "./marker.svg";
import Featured from "./Featured";
import events from './Events'

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiamFtaWVvY29ubmVsbCIsImEiOiJjam44OGFlYzIxYzV6M2xtajNuY290cjMwIn0.Gebr4tJGUcwLFNuY_JPkhg",
  minZoom: 6,
  maxZoom: 15
});

class App extends Component {
  constructor(props) {
    super(props);
    this.changeSelected = this.changeSelected.bind(this);
    this.state = {
      selectedEvent: 0,
      userLong: null,
      userLat: null,
      mapCenterLong: null,
      mapCenterLat: null,
      mapScroll: "jumpTo"
    };
  }

  changeSelected(id) {
    this.setState({
      selectedEvent: id
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLong: position.coords.longitude,
        userLat: position.coords.latitude,
        mapCenterLong: position.coords.longitude,
        mapCenterLat: position.coords.latitude,
        mapScroll: "flyTo"
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[this.state.mapCenterLong, this.state.mapCenterLat]}
          zoom={[11]}
          movingMethod={this.state.mapScroll}
          doubleClickZoom={false}
        >
          <Marker
            className="mapboxgl-user-location-dot mapboxgl-marker mapboxgl-marker-anchor-center"
            coordinates={[this.state.userLong, this.state.userLat]}
            anchor="bottom"
          />
          {events.map((event, index) => {
            return (
              <Marker
                onClick={() => {
                  this.setState({
                    mapCenterLong: event.long,
                    mapCenterLat: event.lat
                  });
                  this.changeSelected(event.id);
                }}
                coordinates={[event.long, event.lat]}
                key={event.id}
              >
                <img
                  alt="marker"
                  style={
                    this.state.selectedEvent == event.id
                      ? { width: "45px" }
                      : { width: "35px" }
                  }
                  src={markerImg}
                />
              </Marker>
            );
          })}
        </Map>
        <Featured
          changeSelected={this.changeSelected}
          currentSelected={this.state.selectedEvent}
          events={events}
        />
      </div>
    );
  }
}

export default App;
