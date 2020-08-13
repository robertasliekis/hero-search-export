import React from "react";
//import $ from "jquery";
import HeroData from "./HeroData";
import ComicsData from "./ComicsData";

// class MainContent extends React.Component {
//   render() {
class MainContent extends React.Component {
  render() {
    const publicKey = "88ebe414618afa23ec34c99800b6ca2d";

    return (
      <div className="main-content-container">
        <HeroData searchInput={this.props.searchInput} publicKey={publicKey} />
        <ComicsData searchInput={this.props.searchInput} publicKey={publicKey} />
      </div>
    );
  }
}
//}

export default MainContent;
