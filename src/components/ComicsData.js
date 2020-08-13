import React from "react";
import $ from "jquery";
import Comic from "./Comic";

class ComicsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerSize: null
    };
    this.myRef = React.createRef();
    this.divHeightArray = [];
  }

  componentDidUpdate(prevProps, prevState) {
    this.ResizeContainer();
    window.addEventListener("resize", this.ResizeContainer.bind(this));

    if (this.ResizeContainer() !== prevState.containerSize) {
      this.setState({ containerSize: this.ResizeContainer() });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.ResizeContainer.bind(this));
  }

  myRef = React.createRef();

  ResizeContainer() {
    let columnAmount = 4;
    if (window.outerWidth <= 1024 && window.outerWidth > 768) {
      columnAmount = 3;
    } else if (window.outerWidth <= 768 && window.outerWidth > 420) {
      columnAmount = 2;
    } else if (window.outerWidth <= 420) {
      columnAmount = 1;
    }

    let divHeightAndIndexArray = Array(this.divHeightArray.length)
      .fill()
      .map((a) => []);

    this.divHeightArray.forEach((height, index) => {
      divHeightAndIndexArray[index].push([height, index]);
    });

    divHeightAndIndexArray.sort(function (a, b) {
      return parseInt(a[0]) - parseInt(b[0]);
    });

    let columnArray = Array(columnAmount)
      .fill()
      .map((a) => []);

    let cycleCountBig = 0;
    let cycleCountSmall = 0;
    let columnArrayIndex = 0;

    // console.log("-----------------");
    divHeightAndIndexArray.forEach((height, index) => {
      if (cycleCountBig % 2 === 0 && cycleCountSmall < columnAmount) {
        columnArrayIndex = index % columnAmount;
        cycleCountSmall++;
        if (cycleCountSmall === columnAmount) {
          cycleCountBig++;
          cycleCountSmall = 0;
        }
      } else {
        if (columnAmount === 4) {
          switch (cycleCountSmall) {
            case 0:
              columnArrayIndex = 3;
              break;
            case 1:
              columnArrayIndex = 2;
              break;
            case 2:
              columnArrayIndex = 1;
              break;
            default:
              columnArrayIndex = 0;
          }
        } else if (columnAmount === 3) {
          switch (cycleCountSmall) {
            case 0:
              columnArrayIndex = 2;
              break;
            case 1:
              columnArrayIndex = 1;
              break;
            default:
              columnArrayIndex = 0;
          }
        } else if (columnAmount === 2) {
          switch (cycleCountSmall) {
            case 0:
              columnArrayIndex = 1;
              break;
            default:
              columnArrayIndex = 0;
          }
        }
        cycleCountSmall++;
        if (cycleCountSmall === columnAmount) {
          cycleCountBig++;
          cycleCountSmall = 0;
        }
      }
      columnArray[columnArrayIndex].push([height[0]]);
    });

    let columnSize = 0;
    columnArray.forEach((el, index) => {
      let newColumnSize = 0;
      el.forEach((height) => {
        let marginBottomPixels = 16;
        let borderPixels = 14;
        newColumnSize = newColumnSize + height[0][0] + marginBottomPixels + borderPixels;
      });
      if (newColumnSize > columnSize) {
        columnSize = newColumnSize;
      }
    });

    let columnArrayOrdered = [];

    columnArray.forEach((el) => {
      for (let i = 0; i < el.length; i++) {
        columnArrayOrdered.push(el[i][0][1]);
      }
    });

    columnArrayOrdered.reverse().forEach((el, index) => {
      $(`.hero-comic${el}`)
        .css("order", index)
        .css("animation-delay", `${1.5 + 0.1 * index}s`);
    });

    return columnSize;
  }

  render() {
    let heroComicsData = Object.values(this.props.heroComicsData);
    this.divHeightArray = [];
    return (
      <div className="hero-comics-wrapper hero-wrapper">
        <h1 className="container-title">Comics</h1>
        <div className="hero-comics-container" style={{ height: this.state.containerSize }}>
          {heroComicsData.length !== undefined ? (
            heroComicsData.map((comic, index) => {
              return <Comic key={index} comic={comic} index={index} childRef={(el) => ((this.myRef = el), el !== null ? this.divHeightArray.push(this.myRef.clientHeight) : null)}></Comic>;
            })
          ) : (
            <div lassName="data-info-text">Loading hero comics data...</div>
          )}
        </div>
      </div>
    );
  }
}

export default ComicsData;
