import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem } from 'reactstrap';

export class AboutMeModalNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateActiveSubsection: this.props.updateActiveSubsection
    }
    this.generateButtons = this.generateButtons.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
  }

  componentDidMount(){
    this.setState({
      items: this.props.items,
      activeSubsection: this.props.activeSubsection,
      buttons: this.generateButtons()
    })
  }

  componentDidUpdate(){
    if(this.props.activeSubsection !== undefined && this.state.activeSubsection !== this.props.activeSubsection){
      this.setState({
        activeSubsection: this.props.activeSubsection,
        buttons: this.generateButtons()
      })
    }
  }

  getNavItemStyle(currentItem, activeItem){
    console.log(`Current Item : ${currentItem} | Active Item : ${activeItem}\n`)
    if(currentItem === activeItem){
      return {
        "minWidth": `${95/this.props.items.length}%`,
        "maxWidth": `${95/this.props.items.length}%`,
        "width": `${95/this.props.items.length}%`
      }
    } else {
      return {
        "minWidth": `${95/this.props.items.length}%`,
        "maxWidth": `${95/this.props.items.length}%`,
        "width": `${95/this.props.items.length}%`
      }
    }
  }

  setActiveItem(subsection){
    this.setState({
      activeSubsection: subsection
    })
  }

  generateButtons(){
    let buttons = [];
    let style;

    for(let item in this.props.items){
      style = this.getNavItemStyle(this.props.items[item], this.props.activeSubsection);
      buttons.push(
        <NavItem
          key={item}
          style={style}
          onClick={() => {this.state.updateActiveSubsection(this.props.items[item])}}>{this.props.items[item]}
        </NavItem>
      )
    }
    return buttons;
  }

  render(){
    return(
      <Navbar className={"about-me-section-nav"}>
        <Nav>
          {this.state.items !== undefined
            ? this.state.items.map((item) =>{
                let style = this.getNavItemStyle(this.state.items[item], this.props.activeSubsection);
                return (
                        <NavItem key={item} style={style}>
                          <Button onClick={() => {this.state.updateActiveSubsection(item)}} > {item} </Button>
                        </NavItem>
                );
              })
            : null
          }
        </Nav>
      </Navbar>
    )
  }
}
