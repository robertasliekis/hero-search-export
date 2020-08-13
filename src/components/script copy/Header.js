import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.hanldeSubmit = this.hanldeSubmit.bind(this);
  }

  // handle input change event
  onInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  // handle button click event and pass data in parent
  hanldeSubmit() {
    this.props.handleInput(this.state.inputValue);
  }

  render() {
    return (
      <div className="header">
        <div className="logo-container">
          <div className="logo-image"></div>
          <div className="logo-text">
            HERO <br /> SEARCH
          </div>
        </div>
        <div className="text-input">
          <input type="text" placeholder="SEARCH FOR A CHARACTER" id="input-field" className="input-field" value={this.state.inputValue || ""} onChange={this.onInputChange} />
          <label htmlFor="input-field" className="button button-submit button-submit-search" onClick={this.hanldeSubmit}>
            <FontAwesomeIcon className="icon" icon={faSearch} />
          </label>
        </div>
      </div>
    );
  }
}

export default Header;
