import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme';

export default function Card({header, subheader, avatar, href, name, children}){
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <h5 className="header-lg center-text">{header}</h5>
          <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
          <h2 className="center-text">
            <a className="link" href={href}>
              {name}
            </a>
          </h2>
          <h4 className="center-text">{subheader}</h4>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
}



Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};