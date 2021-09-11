import React from "react";


function LanguageNav({selected, onUpdateLanguage}) {
  const languages = ["All", "Python", "Javascript", "PHP"];
  return (
    <ul className="flex-center">
      {languages.map((lang) => (
        <li key={lang}>
          <button
            className="btn-clear nav-link"
            style={lang === selected ? { color: "rgb(187, 46, 31)" } : null}
            onClick={() => onUpdateLanguage(lang)}>
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: "All",
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang
    })
    console.log(lang)
  }

  render() {
    const {selectedLanguage} = this.state
    return (
      <React.Fragment>
        <LanguageNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
      </React.Fragment>
    )
  }
}
