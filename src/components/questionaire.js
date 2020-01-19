import React, {PropTypes} from "react";
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
import { HereMap, Circle } from 'rc-here-maps';

function getSteps() {
  return [
    { text: "Hvor vil du gerne bo? " },
    { text: "Hvor stor skal din lejlighed/bolig være?" },
    { text: "Create an ad" }
  ];
}
const circleOptions = {
  style: {
    strokeColor: "rgba(55, 85, 170, 0.1)", // Color of the perimeter
    lineWidth: 2,
    fillColor: "rgba(0, 128, 0, 0.1)", // Color of the circle
  }
};

class Questionaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      lat: 56.2631,
      lng: 10.03745,
      circleRadius: 1
    };


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
    this.setActiveStep(this.state.activeStep + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.activeStep - 1);
  };

  handleReset = () => {
    this.setActiveStep(0);
  };

  handleChangeLocation = e => {
    //remove all stuff
    this.platform = new window.H.service.Platform({
      apikey: "IO2SJssvM_fMfDHfCxBHir03OR6YrKxQzCf1CJwpJkU"
    });
    var geocoder = this.platform.getGeocodingService();
    var geocodingParams = {
      searchText: e.target.value + "Denmark"
    };

    geocoder.geocode(
      geocodingParams,
      result => {
        var location =
          result.Response.View[0].Result[0].Location.DisplayPosition;
        this.setState({
          ...this.state,
          lat: location.Latitude,
          lng: location.Longitude
        });
      },
      function(e) {
        console.error(e);
      }
    );
  };

  handleChangeCircleSize(e) {
    this.setState({ ...this.state, circleRadius: e.target.value });
  }

  getStepContent = index => {
    switch (index) {
      case 0:
        return (
          <div>
            <div className="questionaire-stepcontent-box">
              <TextField
                onChange={e => this.handleChangeLocation(e)}
                id="postnumber"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label="Postnummer"
              />

              <TextField
                onChange={e => this.handleChangeCircleSize(e)}
                id="distanceFrom"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label="Hvor mange meter fra den adresse?"
              />
            </div>
            <div className="questionaire-map">

            <HereMap
                   appId={"WhpVJRPE4HnJTP3BNsHM"}
                   appCode={"IO2SJssvM_fMfDHfCxBHir03OR6YrKxQzCf1CJwpJkU-dWuetlWw"}
                   center={{ lat: this.state.lat, lng: this.state.lng }}
                   zoom={8}
                   useHTTPS={false} 
               >
                   <Circle
                        center={{ lat: this.state.lat, lng: this.state.lng }}
                       strokeColor="#1275E8"
                       fillColor="rgba(212, 92, 91, 0.2)"
                       lineWidth={2}
                       radius={this.state.circleRadius}
                   />
               </HereMap>


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
        <Fade>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label.text}>
                <StepLabel>
                  <Typography variant="h4">{label.text}</Typography>
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
  ...bindActionCreators({}, dispatch)
}); // mapDispatchToProps()

// Exports the redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Questionaire);
