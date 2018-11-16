import React, { Component } from "react";

export default class AsyncSplitMe extends Component {
  state = {
    SplitMe: null
  };

  loadSplitMe = () => {
    import("./SplitMe").then(({ default: SplitMe }) => {
      this.setState({
        SplitMe
      });
    });
  };
  render() {
    const { SplitMe } = this.state;
    return SplitMe ? (
      <SplitMe />
    ) : (
      <button onClick={this.loadSplitMe}>SplitMe loading</button>
    );
  }
}
