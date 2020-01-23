import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../_actions/user";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import './landingpage.css'
import Questionaire from "../components/questionaire";
import Introduction from "../components/introduction";
import Fade from "react-reveal/Fade";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  setStep(step){
      this.setState({step: step})
  }
   renderContentToStep(step) {
    switch (step) {
      case 0:
        return (<Introduction setStep={ (step) => this.setStep(step)}></Introduction>);
      case 1:
          return (<Questionaire></Questionaire>);
      case 2:
          return ( <Questionaire></Questionaire>);
    }
  }
  /**
   * Default render fn for the Template component
   * @public
   * @method
   * @name render
   * @returns renders the template page wrapped in a <div> tag.
   */
  render() {
    return (
      <div className="landingpage-container">
        {this.props.firstTimeLogin ? (
          <div elevation={5} className="landingpage-container-paper">{this.renderContentToStep(this.state.step)}</div>
        ) : null}
      </div>
    );
  } // render()
} // Template.js

/**
 * @name mapStateToProps
 * @description Maps the Component Props to the Redux Props
 * @param {object} state the redux state
 * @returns the mapped props
 */
const mapStateToProps = state => ({
  firstTimeLogin: true
}); // mapStateToProps()

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
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
