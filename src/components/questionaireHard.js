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
      activeStep: 0,
      lat: 56.2631,
      lng: 10.03745,
      circleRadius: 100
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
      this.props.showHard();
    }
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

    //API call to geocode
    let searchQuery =   e.target.value
    try {
      fetch(
        `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodeURI(
          e.target.value
        )}&app_id=s987sOK0bA4ALoekPMyB&app_code=cIchRDLitdL6XsdgSwrGCQ&gen=8&country=DNK`
      ).then(result => {
        try {
          console.log(result);
          result.json().then(async json => {
            try {
              var location =
                json.Response.View[0].Result[0].Location.DisplayPosition;
                this.props.addData({position: {searchText: searchQuery, lat: location.Latitude, lng: location.Longitude}})
              await this.setState({
                ...this.state,
                lat: location.Latitude,
                lng: location.Longitude
              });
              
            } catch (e) {
              //don't do dick on fail
            }
          });
        } catch (e) {
          //don't do dick on fail
        }
      });
    } catch (e) {
      //don't do dick on fail
    }
  };

  handleChangeCircleSize(e) {
    this.setState({ ...this.state, circleRadius: e.target.value });
    this.props.addData({radius: e.target.value})
  }


  handleInput(e){
    this.setState({...this.state, [e.target.id]: e.target.value })
    this.props.addData({ [e.target.id]: e.target.value})
  }

  getStepContent = index => {
    switch (index) {
      case 0:
       return(<div>
         <Typography variant="body1">For at vi kan finde den perfekte lejlighed til dig skal vi først vide hvad du leder efter som minimum.</Typography>
        </div>)
      case 1:
        return (
          <div>
            <div className="questionaire-stepcontent-box">
              <TextField
                onChange={e => this.handleChangeLocation(e)}
                id="adress"
                className="questionaire-stepcontent-box-textfield-address"
                variant="outlined"
                label="Adresse"
              />
            </div>
            <TextField
              onChange={e => this.handleChangeCircleSize(e)}
              id="distanceFrom"
              className="questionaire-stepcontent-box-textfield-distancefrom"
              variant="outlined"
              label="radius (meter)"
              value={this.state.circleRadius}
              type="number"
            />

            <div className="questionaire-map">
              <HereMap
                appId={"s987sOK0bA4ALoekPMyB"}
                appCode={"cIchRDLitdL6XsdgSwrGCQ"}
                center={{ lat: this.state.lat, lng: this.state.lng }}
                zoom={16}
                useHTTPS={true}
              >
                <Circle
                  center={{ lat: this.state.lat, lng: this.state.lng }}
                  strokeColor="#000000"
                  fillColor="rgba(0, 0, 0, 0.2)"
                  lineWidth={5}
                  radius={this.state.circleRadius}
                />
              </HereMap>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <div className="questionaire-stepcontent-box">

              <TextField
                onChange={e => this.handleInput(e)}
                id="size"
                className="questionaire-stepcontent-box-textfield"
                variant="outlined"
                label="Størrelse(m2)"
                type="number"
              />
               <TextField
              onChange={e => this.handleInput(e)}
              id="rooms"
              className="questionaire-stepcontent-box-textfield"
              variant="outlined"
              label="Antal rum "
              type="number"
            />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="questionaire-stepcontent-box"></div>
          </div>
        );
    }
  };
  render() {
    const steps = getSteps();
    const { activeStep } = this.state;
    return (

    
      <div className="questionaire-container">
                   <Typography variant="h3">
            De hårde værdier
           </Typography>

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
  ...bindActionCreators({}, dispatch),
  addData: (data) => dispatch(QuestionaireActions.addData(data))
}); // mapDispatchToProps()

// Exports the redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Questionaire);
