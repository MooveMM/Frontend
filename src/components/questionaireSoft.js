import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as QuestionaireActions from '../_actions/questionaire'
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

function getSteps() {
  return [
    { text: "Hvorfor skal vi vide det?" },
    { text: "Her har du muligheden for at introducere dig selv" },
    { text: "Fortæl os lidt om det nabolag du gerne vil bo i" },
    { text: "Hvilke naboer vil du foretrække? " },
    { text: "Hvordan skal din drømme bolig se ud?" },
    { text: "Hvad er den værste bolig du kan forestille dig?" }
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
      activeStep: 0,
      introduction: "",
      neighbourhood: "",
      neighbours: "",
      dreamAccomodation: "",
      worstAccomodation: ""
    };

    this.platform = new window.H.service.Platform({
      apikey: "rDtKkw-jNNzIP1CWuGhR1M124RsMNC3m2Me4HTkT1nE"
    });
  }

  /**
   * Default render fn for the Template component
   * @public
   * @method
   * @name render
   * @returns renders the template page wrapped in a <div> tag.
   */
  setActiveStep(step) {
    this.setState({ activeStep: step });
  }

  handleNext = () => {
    if(this.state.activeStep === getSteps().length - 1){
        this.props.showDone();
      }
    this.setActiveStep(this.state.activeStep + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.activeStep - 1);
  };

  handleReset = () => {
    this.setActiveStep(0);
  };

  handleInput(e) {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
    this.props.addData({[e.target.id]: e.target.value})
  }

  getStepContent = index => {
    switch (index) {
      case 0:
        return (
          <div>
            <Typography
              variant={"body1"}
              className={"questionaire-container-description"}
            >
              For at kunne matche dig med relevante lejemål og udlejere, bliver
              vi nødt til at vide lidt om hvem du er, hvad du beskæftiger dig
              med og hvilket miljø du helst vil bo i. Disse bløde værdier giver
              os og udlejeren et bedre indblik i, hvem du er som person – og
              hjælper os med at finde den helt rigtige bolig der passer til dine
              præferencer.
            </Typography>
          </div>
        );
      case 1:
        return (
          <div>
            <div className="questionaire-stepcontent-box">
              <TextField
                onChange={e => this.handleInput(e)}
                id="introduction"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label={`Minimum 200 ord - ${this.state.introduction.split(" ")
                  .length - 1}/200`}
                type="number"
                multiline={true}
                rows={10}
                rowsMax={50}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <div className="questionaire-stepcontent-box">
              <TextField
                onChange={e => this.handleInput(e)}
                id="neighbourhood"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label={`Minimum 50 ord - ${this.state.neighbourhood.split(" ")
                  .length - 1}/50`}
                type="number"
                multiline={true}
                rows={10}
                rowsMax={50}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="questionaire-stepcontent-box">
              <TextField
                onChange={e => this.handleInput(e)}
                id="neighbours"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label={`Minimum 50 ord - ${this.state.neighbours.split(" ")
                  .length - 1}/50`}
                type="number"
                multiline={true}
                rows={10}
                rowsMax={50}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <div className="questionaire-stepcontent-box">
              <TextField
                onChange={e => this.handleInput(e)}
                id="dreamAccomodation"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label={`Minimum 50 ord - ${this.state.dreamAccomodation.split(
                  " "
                ).length - 1}/50`}
                type="number"
                multiline={true}
                rows={10}
                rowsMax={50}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <div className="questionaire-stepcontent-box">
              <TextField
                onChange={e => this.handleInput(e)}
                id="worstAccomodation"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label={`Minimum 50 ord - ${this.state.worstAccomodation.split(
                  " "
                ).length - 1}/50`}
                type="number"
                multiline={true}
                rows={10}
                rowsMax={50}
              />
            </div>
          </div>
        );
    }
  };
  render() {
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div className="questionaire-container">
        <Typography variant="h3">De bløde værdier</Typography>

        <Fade>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label.text}>
                <StepLabel>
                  <Typography onClick={() => this.setActiveStep(index)} variant="h4">{label.text}</Typography>
                </StepLabel>
                <StepContent>
                  <div className="questionaire-stepcontent">
                    <Typography>{this.getStepContent(index)}</Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={() => this.handleBack()}
                        className="questionaire-stepcontent-button"
                      >
                        Tilbage
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleNext()}
                        className="questionaire-stepcontent-button"
                      >
                        {activeStep === steps.length - 1 ? "Færdig" : "Næste"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
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
const mapStateToProps = state => ({}); // mapStateToProps()

/**
 * Maps the Component Functions to Redux
 * @name mapDispatchToProps
 * @param {dispatch} dispatch the dispatch entity
 * @returns The bound actions creators
 */
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
  addData: (data) => dispatch(QuestionaireActions.addData(data))
}); // mapDispatchToProps()

// Exports the redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Questionaire);
