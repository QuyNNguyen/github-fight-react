import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import "./components/Popular.js";
import Popular from "./components/Popular.js";
import Battle from "./components/Battle";
import { ThemeProvider } from "./contexts/theme.js";
import Nav from "./components/Nav.js";
import {BrowserRouter as Router, Route} from "react-router-dom";


//Component
//State
//Lifecycle
//UI

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <Route exact path="/" component={Popular} />
              <Route path="/battle" component={Battle}/>

            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(
  //React Element
  //where to render the element
  <App />,
  document.getElementById("app")
);
