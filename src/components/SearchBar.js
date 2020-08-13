import React from "react";

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { childRef } = this.props;
    return <div ref={childRef} />;
  }
}

export default ChildComponent;
