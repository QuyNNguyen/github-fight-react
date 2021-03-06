import React from "react";
import Proptypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "./Card.js";
import Loading from "./Loading.js";

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } =
          repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <FaUser color="rgb(255, 191, 116)" size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

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

ReposGrid.propTypes = {
  repos: Proptypes.array.isRequired,
};

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
          this.setState((repos) => ({
            repos: {
              ...repos,
              [lang]: data,
            },
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

        {this.isLoading() && <Loading text="Fetching Repos" />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}
