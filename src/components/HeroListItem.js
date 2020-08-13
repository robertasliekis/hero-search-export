import React, { Component } from "react";

class HeroListItem extends Component {
  listItemClicked(el) {
    let heroName = el.target.innerText;
    let burgerClicked = false;
    this.props.heroNameInput(heroName, burgerClicked);
  }

  render() {
    return (
      <div className="list-item" onClick={(el) => this.listItemClicked(el)}>
        {this.props.heroName.toUpperCase()}
      </div>
    );
  }
}

export default HeroListItem;
