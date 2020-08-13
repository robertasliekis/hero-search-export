import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      burgerClicked: false,
      searchBarOpen: false
    };
    this.logoClicked = this.logoClicked.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.hanldeSubmit = this.hanldeSubmit.bind(this);
    this.handleClickBurger = this.handleClickBurger.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.burgerInputValue !== prevState.burgerClicked) {
      this.setState({ burgerClicked: this.props.burgerInputValue });
    }
  }

  logoClicked() {
    this.setState({ inputValue: "" });
    this.props.handleInput("");
  }

  onInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  hanldeSubmit() {
    if (this.state.inputValue !== "") {
      this.props.handleInput(this.state.inputValue);
    }
    if (window.outerWidth <= 768) {
      const currentSearchBarState = this.state.searchBarOpen;
      this.setState({ searchBarOpen: !currentSearchBarState });
    }
  }

  handleClickBurger() {
    const currentBurgerMenuState = this.state.burgerClicked;
    this.setState({ burgerClicked: !currentBurgerMenuState });
    this.props.handleBurgerInput(!currentBurgerMenuState);
  }

  render() {
    let burgerClassName = this.state.burgerClicked ? "burger-menu-clicked" : null;
    let inputFieldWidth = () => {
      if (window.outerWidth > 414) {
        return 20;
      } else if (window.outerWidth <= 414 && window.outerWidth > 320) {
        return 15;
      } else return 11.5;
    };

    let windowWidthCheckInput = () => {
      if (window.outerWidth <= 768) {
        return this.state.searchBarOpen;
      } else return true;
    };

    let windowWidthCheckLogo = () => {
      if (window.outerWidth <= 768) {
        return this.state.searchBarOpen;
      } else return false;
    };

    return (
      <div className="header">
        <div className={"burger-menu " + burgerClassName} onClick={this.handleClickBurger}>
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
        <div className="logo-container" onClick={this.logoClicked} style={{ opacity: windowWidthCheckLogo() ? 0 : 1 }}>
          <div className="logo-image"></div>
          <div className="logo-text">
            HERO <br /> SEARCH
          </div>
        </div>
        <div className="text-input">
          <input
            type="text"
            placeholder="SEARCH FOR A HERO..."
            id="input-field"
            className="input-field"
            value={this.state.inputValue || ""}
            onChange={this.onInputChange}
            style={{ width: windowWidthCheckInput() ? `calc(${inputFieldWidth()}rem)` : 0, paddingLeft: windowWidthCheckInput() ? "1rem" : 0 }}
          />
          <label htmlFor="input-field" className="button-submit button-submit-search" onClick={this.hanldeSubmit} style={{ borderTopLeftRadius: windowWidthCheckInput() ? 0 : "1rem" }}>
            <FontAwesomeIcon className="icon" icon={faSearch} />
          </label>
        </div>
      </div>
    );
  }
}

export default Header;
