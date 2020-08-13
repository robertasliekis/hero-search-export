import React from "react";
//import $ from "jquery";
import HeroData from "./HeroData";
import ComicsData from "./ComicsData";

// class MainContent extends React.Component {
//   render() {
class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heroAboutData: [],
      heroComicsData: [],
      isLoadingAbout: false,
      isLoadingComics: false,
      errorAbout: null,
      errorComics: null,
      search: null
    };
  }

  componentDidMount() {
    const apiKey = "88ebe414618afa23ec34c99800b6ca2d";
    let characterName = "hlk";
    const marvelUrl = "https://gateway.marvel.com:443/v1/public/characters";
    const dataUrlHeroAbout = `${marvelUrl}?name=${characterName}&apikey=${apiKey}`;
    fetch(dataUrlHeroAbout)
      .then((response) => response.json())
      .then((data) => (data.data.total > 0 ? this.setState({ heroAboutData: data.data, isLoadingAbout: false }) : null))
      .catch((errorAbout) => this.setState({ errorAbout, isLoadingAbout: false }));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.search !== this.props.searchInput) {
  //     this.setState({ search: this.props.searchInput });
  //     this.setState({ isLoadingAbout: true, isLoadingComics: true });

  //     const apiKey = "88ebe414618afa23ec34c99800b6ca2d";
  //     let characterName = this.props.searchInput;
  //     console.log(characterName);
  //     let characterName = "hulk";

  //     const characterID = "1009351";
  //     const marvelUrl = "https://gateway.marvel.com:443/v1/public/characters";
  //     const dataUrlHeroAbout = `${marvelUrl}?name=${characterName}&apikey=${apiKey}`;
  //     const dataUrlHeroComics = `${marvelUrl}/${characterID}/comics?apikey=${apiKey}`;
  //     if (characterName !== "") {
  //       fetch(dataUrlHeroAbout)
  //         .then((response) => {
  //           if (response.ok) {
  //             return response.json();
  //           } else {
  //             console.log("Something went wrong ...");
  //           }
  //         })
  //         .then((data) => {
  //           this.setState({ heroAboutData: data.data.results[0], isLoadingAbout: false });
  //           /* fetch(`${marvelUrl}/${data.data.results[0].id}/comics?apikey=${apiKey}`)
  //             .then((response) => response.json())
  //             .then((data) => this.setState({ heroComicsData: data.data.results, isLoadingComics: false }))
  //             .catch((errorComics) => {
  //               this.setState({ errorComics, isLoadingComics: false });
  //             });*/
  //         })

  //          .catch((errorAbout) => this.setState({ errorAbout, isLoadingAbout: false }));
  //         .catch((errorAbout) => console.log("asdad" + errorAbout));
  //     }
  //   }
  // }

  render() {
    const { heroAboutData, heroComicsData, isLoadingComics, isLoadingAbout, errorAbout, errorAboutValue, errorComics } = this.state;
    console.log(heroAboutData);
    if (errorAbout) {
      //  return <p>{errorAbout.message}</p>;
    }

    if (errorComics) {
      //   return <p>{errorComics.message}</p>;
    }

    // if (isLoadingAbout || heroAboutData === undefined) {
    if (isLoadingAbout) {
      //if (isLoadingAbout) {
      //  return <p>Loading hero about data...</p>;
    }

    //console.log(heroAboutData.name);
    return (
      <div className="main-content-container">
        {/* {heroAboutData === null ? console.log("empty data") : console.log(heroAboutData)} */}
        {/* {"name" in heroAboutData ? console.log("undefined") : console.log(heroAboutData.name)} */}
        {/* {heroAboutData !== undefined ? console.log(typeof heroAboutData) : console.log("hero data undefined")} */}
        {heroAboutData.total > 0 ? <HeroData heroAboutData={heroAboutData.results[0]} /> : console.log("hero data undefined")}
        {/* {console.log(heroAboutData)} */}
        {/* <HeroData heroAboutData={heroAboutData} /> */}
        {/* {heroAboutData.name !== undefined ? <HeroData heroAboutData={heroAboutData} /> : console.log("hero data undefined")} */}
        {/*  {!isLoadingComics ? <ComicsData heroComicsData={heroComicsData} /> : <div className="data-loading-text">Loading hero comics data...</div>} */}
      </div>
    );
  }
}
//}

export default MainContent;
