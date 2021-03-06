import React, { Component } from 'react';
import {Container } from 'reactstrap';
import './index.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Portal } from './Portal';

const helpers = require('./helpers.js');

//TODO
// add skill logos to button/objects
// About Me: update content where needed | Make mobile modal close button work | fix styling for about me nav item buttons
// Standardize modal close buttons
// *** Skills: finish adding content | fix skills-modal-close-button styling | reduce font-size for skill-modal body text & decrease horizontal padding | skills-modal-close-button has no onClick listener
// Portfolio: style modal elements smaller screens / add content
// Contact: replace github and linkedin text with icons

class App extends Component {
  // MAKE SURE YOU PASS PROPS IF YOU LOAD FROM SERVER.....
  constructor(){
    super()
    this.state = {
      activeView: "DefaultView",
      isHome: true,
      classes: "App",
      filter: "body-filter filter-on",
      pulse: "pulse",
      isOpen: false,
      screenSize: helpers.determineScreenSize()
    }
    this.setActiveView = this.setActiveView.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  setActiveView(view){
    let isHome = (view === "DefaultView")
    let classes, pulse, filter;

    if(isHome){
      classes = `App transition`;
      filter = "body-filter filter-on";
      pulse = "pulse"
    } else {
      classes="App";
      filter = "body-filter";
      pulse = ""
    }
    this.setState({
      activeView: `${view}`,
      isHome: isHome,
      classes: classes,
      filter: filter,
      pulse: pulse
    });
  }

  checkSize(){
    console.log("resize")
    let screenSize = helpers.determineScreenSize();
    if(screenSize !== this.state.screenSize){
      this.setState({
        screenSize: screenSize
      })
    }
  }

  componentDidMount(){
    window.onresize = this.checkSize;
    setTimeout(()=>{
      this.setState({isOpen: !this.state.isOpen})
    }, 300)
  }

  componentDidUpdate(){

  }

  render() {
    return (
      <Container className={this.state.classes}>
        <div className={this.state.filter}/>
        <div className={`header-container`} onClick={()=>{this.setActiveView("DefaultView")}}>
          <header className={`App-header ${this.state.pulse}`}>
          taylor mosier
          </header>
        </div>
        <TransitionGroup component={null}>
          { this.state.isOpen && (
            <CSSTransition classNames="main-transition" timeout={300}>
              <Portal
                screenSize={this.state.screenSize}
                activeView={this.state.activeView}
                setActiveView={this.setActiveView}
              />
            </CSSTransition>
          )}
        </TransitionGroup>
      </Container>
    );
  }
}

export default App;
