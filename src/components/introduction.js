import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import apartment1 from "../images/apartment1.jpeg";
import apartment2 from "../images/apartment2.jpeg";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider
} from "@material-ui/core";
import "./introduction.css";
import Fade from "react-reveal/Fade";
class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };

    setInterval(() => this.setState({ step: this.state.step + 1 }), 1000);
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
      <div className="introduction-container">
        <Fade when={this.state.step > 0}>
          <Typography variant={"h1"} className="introduction-text">
            Hej
          </Typography>
          <br></br>
          <Divider></Divider>
          <br></br>
        </Fade>
        <Fade when={this.state.step > 1}>
          <div className="side-by-side">
            <img className="introduction-image-left" src={apartment1}></img>
            <Typography className="introduction-text-right" variant={"h6"}>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?"
            </Typography>
          </div>
        </Fade>

        <Fade when={this.state.step > 2}>
          <Divider></Divider>
          <div className="side-by-side">
            <Typography className="introduction-text-right" variant={"h6"}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum." Og
              noget om teknologi og finde et godt sted til dig
            </Typography>
            <img className="introduction-image-left" src={apartment2}></img>
          </div>
        </Fade>

        <Fade when={this.state.step > 3}>
          <div className="side-by-side">
            <Button
              color="primary"
              variant="contained"
              className="introduction-start-button"
              onClick={() => this.props.setStep(1)}
            >
            <Typography variant="h4">Start rejse</Typography>
            </Button>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Introduction);
