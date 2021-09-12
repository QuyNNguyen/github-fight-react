import React from "react";
import Proptypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

function LanguageNav(props) {
  const languages = ["All", "Python", "Javascript", "PHP"];
  return (
    <ul className="flex-center">
      {languages.map((lang) => (
        <li key={lang}>
          <button
            className="btn-clear nav-link"
            style={
              lang === props.selected ? { color: "rgb(187, 46, 31)" } : null
            }
            onClick={() => props.onUpdateLanguage(lang)}
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguageNav.propTypes = {
  selected: Proptypes.string.isRequired,
  onUpdateLanguage: Proptypes.func.isRequired,
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      error: null,
      repos: {},
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      error: null,
    });

    if (!this.state.repos[lang]) {
      fetchPopularRepos(lang)
        .then((data) => {
          this.setState(({repos}) => ({
            repos: {
              ...repos,
              [lang]: data,
            }
          }));
        })
        .catch((error) => {
          console.warn("error fetching repos: ", error);

          this.setState({
            error: "There was an error fetching the repos",
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, error, repos } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguageNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}
        {repos[selectedLanguage] && (
          <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>
        )}
      </React.Fragment>
    );
  }
}
