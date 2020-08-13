import React from "react";
import $ from "jquery";

class HeroData extends React.Component {
  render() {
    let characterName = "hulk";
    //let characterName = this.props.searchInput;
    const publicKey = this.props.publicKey;

    function displayHeroData() {
      if (characterName !== "") {
        let dataURL = `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&apikey=${publicKey}`;
        fetch(dataURL)
          .then((response) => response.json())
          .then((data) => {
            //  console.log(data.data.results[0]);
            //console.log(data);
            $(".hero-info-container").html("");

            $(".hero-info-container").append(`
          <div class="hero-description">
            <div class="hero-name">${data.data.results[0].name.toUpperCase()}</div>
            <div class="hero-about">${data.data.results[0].description}</div>
          </div>
          <div class="hero-image"></div>
          `);
            $(".hero-image").css("background-image", `url(${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension})`);
          })
          .catch(function () {
            console.log("hero not found");
          });
      }
    }

    displayHeroData();

    return <div className="hero-info-container"></div>;
  }
}

export default HeroData;
