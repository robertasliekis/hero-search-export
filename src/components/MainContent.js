import React from "react";
//import $ from "jquery";
import HeroData from "./HeroData";
import ComicsData from "./ComicsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";


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
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.props.searchInput) {
      this.setState({ search: this.props.searchInput });
      this.fetchData();
    }
  }

  fetchData() {
    this.setState({ isLoadingAbout: true, isLoadingComics: true, errorAbout: false, errorComics: false });

    const apiKey = "88ebe414618afa23ec34c99800b6ca2d";
    // const apiKey = "233a44adf3f0c2e7cb6194d99ef03998";
    let characterName = this.props.searchInput;

    const marvelUrl = "https://gateway.marvel.com:443/v1/public/characters";
    const dataUrlHeroAbout = `${marvelUrl}?name=${characterName}&apikey=${apiKey}`;
    if (characterName !== "") {
      fetch(dataUrlHeroAbout)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("Something went wrong ...");
          }
        })
        .then((data) => {
          if (data.data.total > 0) {
            this.setState({ heroAboutData: data.data, isLoadingAbout: false });
          }

          let characterID = data.data.results[0].id;
          const dataUrlHeroComics = `${marvelUrl}/${characterID}/comics?apikey=${apiKey}`;

          fetch(dataUrlHeroComics)
            .then((response) => response.json())
            .then((data) => {
              if (data.data.total > 0) {
                this.setState({ heroComicsData: data.data, isLoadingComics: false });
              }
            })
            .catch((errorComics) => {
              this.setState({ errorComics, isLoadingComics: false });
            });
        })

        .catch((errorAbout) => this.setState({ errorAbout, isLoadingAbout: false }));
    }
  }

  render() {
    const { heroAboutData, heroComicsData, isLoadingComics, isLoadingAbout, errorAbout, errorComics } = this.state;

    if (errorAbout) {
      return (
        <div className="data-info-text">
          <div className="message-text">Hero {this.props.searchInput} does not exist . . .</div>
          <FontAwesomeIcon className="icon icon-exclamation" icon={faExclamation} />
        </div>
      );
    }

    if (errorComics) {
      return <div className="data-info-text">{errorComics.message}</div>;
    }

    if (isLoadingAbout) {
      return (
        <div className="data-info-text">
          <div className="message-text">Loading hero</div>
          <FontAwesomeIcon className="icon" icon={faSpinner} />
        </div>
      );
    }

    if (isLoadingComics) {
      return (
        <div className="data-info-text">
          <div className="message-text">Loading hero</div>
          <FontAwesomeIcon className="icon" icon={faSpinner} />
        </div>
      );
    }

    return (
      <div className="main-content-container">
        {heroAboutData.total > 0 ? <HeroData heroAboutData={heroAboutData.results[0]} /> : <div className="data-info-text">Character does not exist</div>}
        {heroComicsData.total > 0 ? <ComicsData heroComicsData={heroComicsData.results} /> : <div className="data-info-text">Loading hero comics data...</div>}
      </div>
    );
  }
}


export default MainContent;
