import React from "react";

class Comic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let comic = this.props.comic;
    let index = this.props.index;

    let charactersArray = comic.characters.items;
    let creatorsArray = comic.creators.items;

    const DisplayInfoList = (props) => {
      let array = props.listArray;
      let listArrayLength = array.length;
      if (listArrayLength > 0) {
        return (
          <div className={`comic-${props.className}-container comic-${props.className}-container${index} info-div`}>
            <span className="color-text">{props.className.charAt(0).toUpperCase() + props.className.slice(1)}: </span>
            {array.map((character, index) => {
              return (
                <div key={`list-item${index}`} className="list-item">
                  {character.name}
                  {array.length !== index + 1 ? <div className="punctuation">,</div> : null}
                </div>
              );
            })}
          </div>
        );
      } else {
        return null;
      }
    };

    const { childRef } = this.props;

    return (
      <a ref={childRef} href={comic.urls[0].url} className={`hero-comic hero-comic${index}`} style={{ animationDelay: `${1.5 + 0.1 * index}s` }}>
        <div
          className={`comic-poster comic-poster${index}`}
          style={{ backgroundImage: `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`, backgroundPosition: comic.thumbnail.path.includes("image_not_available") ? `left` : `center` }}
        ></div>
        <div className={`comic-info comic-info${index}`}>
          <div className={`comic-title comic-title${index} info-div`}> {comic.title}</div>
          {comic.description !== null ? (
            <div className={`comic-description comic-description${index} info-div`}>
              <span className="color-text">Description: </span> {comic.description}
            </div>
          ) : null}
          {<DisplayInfoList listArray={charactersArray} className="characters" index={index} />}
          {<DisplayInfoList listArray={creatorsArray} className="creators" index={index} />}
        </div>
      </a>
    );
  }
}

export default Comic;
