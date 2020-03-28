import React, { Component } from 'react'

class TechList extends Component {
  state = {
    techs: ['NodeJS', 'ReactJS', 'React Native'],
  }

  render() {
    return (
      <ul>
        {this.state.techs.map(tech => (
          <li>{tech}</li>
        ))}
      </ul>
    )
  }
}

export default TechList
