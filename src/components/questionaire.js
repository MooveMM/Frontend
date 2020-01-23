import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from "@material-ui/core";
import "./questionaire.css";
import Fade from "react-reveal/Fade";
import { HereMap, Circle, Marker } from "rc-here-maps";
import QuestionaireHard from "./questionaireHard";
import QuestionaireSoft from "./questionaireSoft";
import * as QuestionaireActions from "../_actions/questionaire";
function getSteps() {
  return [
    { text: "Hvor vil du gerne bo? " },
    { text: "Hvor stor skal din lejlighed/bolig være?" },
    { text: "FLERE STEPS TAK!" }
  ];
}
const circleOptions = {
  style: {
    strokeColor: "rgba(55, 85, 170, 0.1)", // Color of the perimeter
    lineWidth: 100,
    fillColor: "rgba(0, 128, 0, 0.1)" // Color of the circle
  }
};

class Questionaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHard: false,
      done: true
    };
  }

  render() {
    return (
      <div className="questionaire-main">
        <div className="questionaire-main-container">
          <Fade>
            <QuestionaireHard
              showHard={() => this.setState({ showHard: true })}
            ></QuestionaireHard>
          </Fade>
          <Fade when={this.state.showHard}>
            <QuestionaireSoft
              showDone={() => this.setState({ done: true })}
            ></QuestionaireSoft>
          </Fade>
        </div>
        <Fade when={this.state.done}>
          <Button
            color="primary"
            variant="contained"
            className="introduction-start-button"
            onClick={() => this.props.analyse()}
          >
            <Typography variant="h4">Færdig</Typography>
          </Button>
          {this.props.result ? (
            <div style={{ padding: 10 }}>
              <div>THIS IS DEBUG STUFF, HAVE FUN MORTEN!</div>
              <div>Translations:</div>
              {this.props.result.translations.map(text => {
                return (
                  <div>
                    <div>{text.translation}</div>
                    <br />
                  </div>
                );
              })}
              <div>Results:</div>
              <br />
              <div>Personality:</div>
              <br />
              {this.props.result.result.personality.map(element => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <div> {element.name} </div>
                    <div>percentile: {element.percentile} </div>
                    <div>raw_score: {element.raw_score} </div>
                  </div>
                );
              })}

              <div>needs:</div>
              <br />
              {this.props.result.result.needs.map(element => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <div> {element.name} </div>
                    <div>percentile: {element.percentile} </div>
                    <div>raw_score: {element.raw_score} </div>
                  </div>
                );
              })}
              <div>values:</div>
              <br />
              {this.props.result.result.values.map(element => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <div> {element.name} </div>
                    <div>percentile: {element.percentile} </div>
                    <div>raw_score: {element.raw_score} </div>
                  </div>
                );
              })}
              <div>consumption preferences:</div>
              <br />
              {this.props.result.result.consumption_preferences.map(element => {
               return (<div  style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                alignItems: "center"
               
              }}> 
                 <div style={{margin: 10}}> {element.name} </div>

              {element.consumption_preferences.map(
                  element => {
                    return (
                      <div
                      style={{margin: 10, fontWeight: element.score === 1 ? "bold": 100}}
                      >
                        <div> {element.name} </div>
                        <div> {element.score} </div>

                      </div>
                    );
                  }
                )
              } </div>)})}
            </div>
          ) : <div></div>}
        </Fade>
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
  result: state.questionaire.result.result? state.questionaire.result : null
}); // mapStateToProps()

/**
 * Maps the Component Functions to Redux
 * @name mapDispatchToProps
 * @param {dispatch} dispatch the dispatch entity
 * @returns The bound actions creators
 */
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
  analyse: () => dispatch(QuestionaireActions.analyse())
}); // mapDispatchToProps()

// Exports the redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Questionaire);
