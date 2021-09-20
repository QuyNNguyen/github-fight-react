import React, { Children } from "react";
import Proptypes from "prop-types"
import { render } from "react-dom";


const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}

export default class Tooltips extends React.Component{

  constructor(props){
    super(props),

    this.state = {
      hover: false
    }

    this.mouseIn = this.mouseIn.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseIn(){
    this.setState({ hover: true})
  }
  mouseOut(){
    this.setState({hover: false})
  }

  render(){
    const {text,children} = this.props;
    const {hover} = this.state;

    return(
    <div onMouseOver={this.mouseIn}
        onMouseOut={this.mouseOut}
        style= {styles.container}
    > 
        {hover === true && <div style={styles.tooltip}> {text} </div>}
        {children}
    </div>
    )
  }
}
