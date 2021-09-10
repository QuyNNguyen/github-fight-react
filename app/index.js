import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import "./components/Popular.js"
import Popular from "./components/Popular.js"

//Component
//State
//Lifecycle
//UI



class App extends React.Component {
  render() {
    return (
      <div className ="container">
        <Popular />
      </div>
    );
  }
}

ReactDom.render(
  //React Element
  //where to render the element
  <App />,
  document.getElementById("app")
);
