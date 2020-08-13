import React from "react";
import $ from "jquery";
import Comic from "./Comic";

class ComicsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: {},
      isLoading: false,
      error: null
    };
    this.myRef = React.createRef();
    this.divHeightArray = [];
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const characterID = "1009351";
    const dataURL = `https://gateway.marvel.com:443/v1/public/characters/${characterID}/comics?apikey=${this.props.publicKey}`;
    fetch(dataURL)
      .then((response) => response.json())
      .then((data) => this.setState({ comics: data.data.results, isLoading: false }))
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidUpdate() {
    const height = this.myRef.clientHeight;
    console.log(this.divHeightArray);
    let columnAmount = 4;

    let comicsSelectorHeight = this.divHeightArray.reduce((total, comic) => total + comic, 0) + this.divHeightArray.length * 16;
    let containerMinHeight = comicsSelectorHeight / columnAmount;
    let containerSetHeight = 0;

    this.divHeightArray.forEach((comic) => {
      if (containerMinHeight > containerSetHeight) {
        containerSetHeight = containerSetHeight + comic + 16;
      }
    });

    $(".hero-comics-container").css("height", containerSetHeight);
    //  console.log(this.myRef);
    // console.log(this.myRef.baseURI);
    // console.log($(".hero-comic19").height());
    // let comicsSelector = Array.apply(null, document.querySelectorAll(".hero-comic"));
    // console.log(comicsSelector);
    // $(".hero-comics-container").css("height", 5000);
  }

  myRef = React.createRef();

  render() {
    const { comics, isLoading, error } = this.state;
    //const dalykai = hits.data;
    let result = Object.values(comics);

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    let dataAmount = result.length;
    const ResizeContainer = () => {
      let comicsSelector = Array.apply(null, document.querySelectorAll(".hero-comic"));
      let comicsSelectorHeight = comicsSelector.reduce((total, comic) => total + $(comic).height(), 0) + dataAmount * 16;

      var columnAmount = 4;
      var containerMinHeight = comicsSelectorHeight / columnAmount;
      var containerSetHeight = 0;

      comicsSelector.forEach((comic) => {
        if (containerMinHeight > containerSetHeight) {
          containerSetHeight = containerSetHeight + $(comic).height() + 16;
        }
      });
      //  $(".hero-comics-container").css("height", containerSetHeight);
      //console.log(containerSetHeight);
      //return 3800;
    };

    return (
      <div className="hero-comics-container" style={{ height: ResizeContainer() }}>
        {result.length !== undefined ? (
          result.map((comic, index) => {
            return <Comic key={index} comic={comic} index={index} childRef={(el) => ((this.myRef = el), this.divHeightArray.push(this.myRef.clientHeight))}></Comic>;
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default ComicsData;

//   componentDidMount() {
//     this.setState({ isLoading: true });
//       const characterID = "1009351";
//     const dataURL = `https://gateway.marvel.com:443/v1/public/characters/${characterID}/comics?apikey=${publicKey}`;
//     fetch(dataURL)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error('Something went wrong ...');
//         }
//       })
//       .then(data => this.setState({ hits: data.hits, isLoading: false }))
//       .catch(error => this.setState({ error, isLoading: false }));
//   }

//  const { hits } = this.state;

//     return (
//       <ul>
//         {hits.map(hit =>
//           <li key={hit.objectID}>
//             <a href={hit.url}>{hit.title}</a>
//           </li>
//         )}
//       </ul>
//     );

//    }

// const { comicsData } = this.state;

// return (
//   <div className="hero-comics-container">
//     {comicsData.map((comic) => (
//       <li>
//         <h1>gera</h1>
//       </li>
//     ))}
//   </div>
// );

/*
    let publicKey = this.props.publicKey;
    let characterID = "1009351";
    let dataURL = `https://gateway.marvel.com:443/v1/public/characters/${characterID}/comics?apikey=${publicKey}`;
    function displayComicsData() {
      fetch(dataURL)
        .then((response) => response.json())
        .then((data) => {
          const comics = data.data.results;
          const dataAmount = data.data.results.length;

          console.log(comics);
          comics.forEach((comic, index) => {
            $(".hero-comics-container").append(
              `<a href="${comic.urls[0].url}" class="hero-comic hero-comic${index}">
              <div class="comic-poster comic-poster${index}"></div>
              <div class="comic-info comic-info${index}">
              <div class="comic-title comic-title${index}"> ${comic.title}</div>           
              </div>
              </a>`
            );
            if (comic.description !== null) {
              $(`.comic-info${index}`).append(`<div class="comic-description comic-description${index}"><span class="color-text">Description: </span> ${comic.description}</div>`);
            }
            let charactersArray = comic.characters.items;
            let creatorsArray = comic.creators.items;

            DisplayInfoList(charactersArray, "characters", index);
            DisplayInfoList(creatorsArray, "creators", index);

            if (comic.thumbnail.path.includes("image_not_available")) {
              $(`.comic-poster${index}`).css("background-position", `left`);
            }
            $(`.comic-poster${index}`).css("background-image", `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`);
          });

          const ResizeContainer = () => {
            let comicsSelector = Array.apply(null, document.querySelectorAll(".hero-comic"));
            let comicsSelectorHeight = comicsSelector.reduce((total, comic) => total + $(comic).height(), 0) + dataAmount * 16;

            var columnAmount = 4;
            var containerMinHeight = comicsSelectorHeight / columnAmount;
            var containerSetHeight = 0;

            comicsSelector.forEach((comic) => {
              if (containerMinHeight > containerSetHeight) {
                containerSetHeight = containerSetHeight + $(comic).height() + 16;
              }
            });
            $(".hero-comics-container").css("height", containerSetHeight);
          };
          $(document).ready(ResizeContainer);
          $(window).resize(ResizeContainer);
        })
        .catch(function () {
          console.log("hero not found");
        });
    }

    const DisplayInfoList = (list, className, index) => {
      let listArrayLength = list.length;
      if (listArrayLength > 0) {
        $(`.comic-info${index}`).append(`<div class="comic-${className} comic-${className}${index}"><span class="color-text">${className[0].toUpperCase() + className.slice(1)}:</span></div>`);
        list.forEach((character, i) => {
          $(`.comic-${className}${index}`).append(character.name);
          if (listArrayLength !== i + 1) {
            $(`.comic-${className}${index}`).append(", ");
          }
        });
      }
    };

    displayComicsData();
    */
//}
