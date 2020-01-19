import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import  MoreVert from "@material-ui/icons/MoreVert";
import * as UserActions from "../_actions/user";
import './navbar.css'
class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
  /**
   * Default render fn for the Template component
   * @public
   * @method
   * @name render
   * @returns renders the template page wrapped in a <div> tag.
   */
  handleClose(){
    this.setState({anchorEl: null})
  }
  handleOpen(event){
    this.setState({anchorEl: event.target})
  }
  render() {

    return (
      <AppBar position="static">
        <Toolbar className="Navbar-toolbar">
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={(event) => this.handleOpen(event)}
           
          >
            <MoreVert />
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={() =>  this.handleClose()}
              onBlur={() => this.handleClose()} 
            >
              <MenuItem onClick={ () =>  this.props.logout()}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  } // render()
} // Template.js

/**
 * @name mapStateToProps
 * @description Maps the Component Props to the Redux Props
 * @param {object} state the redux state
 * @returns the mapped props
 */
const mapStateToProps = state => ({}); // mapStateToProps()

/**
 * Maps the Component Functions to Redux
 * @name mapDispatchToProps
 * @param {dispatch} dispatch the dispatch entity
 * @returns The bound actions creators
 */
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
  logout: () => dispatch(UserActions.logout())
}); // mapDispatchToProps()

// Exports the redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
