import React from "react"

export default class Popular extends React.Component{
  constructor(props){
    super(props)

    this.state = {
        selectedLanguage = "All"
    }
  }
  
  render(){

    const languages = ["All", "Javascript", "Ruby", "Java"];
    return( 
    <ul className="flex-center">{languages.map((lang)=> 
      <li key={lang}>
        <button className="btn-clear nav-link"> {lang} </button>
        </li>
      )
    }
    </ul>
    )
  }
}