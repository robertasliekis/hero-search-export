import React from "react";

class HeroData extends React.Component {
  render() {
    let heroAboutData = this.props.heroAboutData;
    return (
      <div className="hero-info-wrapper hero-wrapper">
        <h1 className="container-title">Character</h1>
        <div className="hero-info-container">
          <div className="hero-image" style={{ backgroundImage: `url(${heroAboutData.thumbnail.path}.${heroAboutData.thumbnail.extension})` }}></div>

          <div className="hero-description">
            <div className="hero-name info-div">{heroAboutData.name.toUpperCase()}</div>
            <div className="hero-about info-div">{heroAboutData.description}</div>
            <div className="hero-comics info-div info-numbers">
              <span className="color-text ">Comics:</span>
              {heroAboutData.comics.available}
            </div>
            <div className="hero-stories info-div info-numbers">
              <span className="color-text">Stories:</span>
              {heroAboutData.stories.available}
            </div>
            <div className="hero-series info-div info-numbers ">
              <span className="color-text">Series:</span>
              {heroAboutData.series.available}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeroData;
