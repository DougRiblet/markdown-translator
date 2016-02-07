"use strict";

var MarkFrame = React.createClass({
  displayName: "MarkFrame",

  render: function render() {
    return React.createElement(
      "form",
      null,
      React.createElement(
        "textarea",
        { name: "markTextarea",
          onChange: this.props.markChange },
        this.props.markInput
      )
    );
  }
});

var TranFrame = React.createClass({
  displayName: "TranFrame",

  transformMarkup: function transformMarkup(y) {
    var mark2html = marked(y, { sanitize: true });
    return { __html: mark2html };
  },
  render: function render() {
    return React.createElement(
      "div",
      { id: "tranDiv" },
      React.createElement("span", { dangerouslySetInnerHTML: this.transformMarkup(this.props.markInput) })
    );
  }
});

var FullPage = React.createClass({
  displayName: "FullPage",

  getInitialState: function getInitialState() {
    return { markInput: "Heading\n=======\n\nSub-heading\n-----------\n\n### Another deeper heading\n\nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Doug Riblet](https://github.com/smashzen)*" };
  },
  markChange: function markChange(k) {
    this.setState({ markInput: k.target.value });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-md-5", id: "markBox" },
        React.createElement(
          "h2",
          { className: "colTitle" },
          "Type in Markdown"
        ),
        React.createElement(MarkFrame, { markInput: this.state.markInput, markChange: this.markChange })
      ),
      React.createElement(
        "div",
        { className: "col-md-2", id: "midGap" },
        React.createElement("span", { id: "arrow", className: "glyphicon glyphicon-arrow-right" })
      ),
      React.createElement(
        "div",
        { className: "col-md-5", id: "tranBox" },
        React.createElement(
          "h2",
          { className: "colTitle" },
          "See HTML Output"
        ),
        React.createElement(TranFrame, { markInput: this.state.markInput })
      )
    );
  }
});

React.render(React.createElement(FullPage, null), document.getElementById('container'));