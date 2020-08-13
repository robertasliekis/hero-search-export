import React from "react";
import { Component } from "react";
import HeroListItem from "./HeroListItem";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.heroNameInputValue = this.heroNameInputValue.bind(this);
  }

  heroNameInputValue(val1, val2) {
    this.props.heroNameInput(val1, val2);
    this.props.heroButtonClicked(val2);
  }

  render() {
    var sideMenuClassName = this.props.burgerMenuInput ? "side-menu-open" : null;
    const heroList = [
      "captain america",
      "hulk",
      "thor",
      "iron man",
      "black widow",
      "thanos",
      "spider-man",
      "deadpool",
      "wolverine",
      "hawkeye",
      "cable",
      "magneto",
      "loki",
      "groot",
      "gamora",
      "nick fury",
      "mystique",
      "nebula",
      "rocket raccoon"
    ];

    return (
      <div className={"side-menu " + sideMenuClassName}>
        <h1 className="category-name">POPULAR HEROES</h1>
        <div className="category-list">
          {heroList.map((hero, index) => {
            return <HeroListItem key={"HeroKey" + index} heroName={hero} heroNameInput={this.heroNameInputValue} />;
          })}
        </div>
      </div>
    );
  }
}

export default SideMenu;
