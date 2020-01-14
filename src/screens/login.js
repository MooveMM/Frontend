import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import apartment from "../images/apartment.jpg";
import "./login.css";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import Lottie from "react-lottie";
import animationData from "../lottie/house.json";
import setupStore from "../store";
import * as UserActions from "../_actions/user";
import Fade from "react-reveal/Fade";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordVerify: "",
      registerUser: false,
      playanimation: true
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
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
      <div className={"login-container"}>
        <Paper className={"login-sidebar"}>
          <Lottie
            options={defaultOptions}
            width={"100%"}
            height={"33%"}
            className="login-lottie"
          />
          {!this.state.registerUser ? (
            <Fade right when={this.state.playanimation}>
              <div className="login-box">
                <Typography className="login-box-headline" variant="h2">
                  Log ind
                </Typography>
                <TextField
                  onChange={e => this.handleChange(e)}
                  id="username"
                  className="login-box-textfield"
                  variant="outlined"
                  label="Brugernavn"
                />
                <TextField
                  type="password"
                  onChange={e => this.handleChange(e)}
                  id="password"
                  className="login-box-textfield"
                  variant="outlined"
                  label="Kodeord"
                />
                {this.props.loginError ? (
                  <Typography className="login-box-headline" variant="h6">
                    Kunne ikke logge dig ind
                  </Typography>
                ) : null}
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    className="login-register-button"
                    onClick={() =>{
                        this.setState({ registerUser: !this.state.registerUser, playanimation: false })
                      setTimeout(() => this.setState({playanimation: true}), 300)
                      }
                    }
                  >
                    Registrer
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className="login-login-button"
                    onClick={() =>
                      this.props.login(this.state.username, this.state.password)
                    }
                  >
                    {this.props.loading ? (
                      <CircularProgress
                        color="secondary"
                        className="login-login-loader"
                      />
                    ) : (
                      "Log ind"
                    )}
                  </Button>
                </div>
              </div>
            </Fade>
          ) : (
            <Fade right when={this.state.playanimation}>
              <div className="login-box">
                <Typography className="login-box-headline" variant="h2">
                Registrer
                </Typography>
                <TextField
                  onChange={e => this.handleChange(e)}
                  id="username"
                  className="login-box-textfield"
                  variant="outlined"
                  label="Brugernavn"
                />
                <TextField
                  type="password"
                  onChange={e => this.handleChange(e)}
                  id="password"
                  className="login-box-textfield"
                  variant="outlined"
                  label="Kodeord"
                />
                <TextField
                  type="password"
                  error={this.state.password != this.state.passwordVerify}
                  onChange={e => this.handleChange(e)}
                  id="passwordVerify"
                  className="login-box-textfield"
                  variant="outlined"
                  label="Gentag Kodeord"
                />
                {this.props.registerError ? (
                  <Typography className="login-box-headline" variant="h6">
                    {"Kunne ikke oprette dig"}
                  </Typography>
                ) : null}
                                {this.props.registerSuccess ? (
                  <Typography className="login-box-headline" variant="h6">
                    {"Din konto er nu oprettet"}
                  </Typography>
                ) : null}
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    className="login-login-button"
                    onClick={() =>{
                      this.setState({ registerUser: !this.state.registerUser, playanimation: false })
                    setTimeout(() => this.setState({playanimation: true}), 300)
                    }
                    }
                  >

                      Tilbage
             
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className="login-register-button"
                    onClick={() =>
                      this.props.register(
                        this.state.username,
                        this.state.password
                      )
                    }
                  >
                      {this.props.loading?
                    <CircularProgress
                        color="secondary"
                        className="login-login-loader"
                      />
                      :
                    "Registrer"
                      }
                  </Button>
                </div>
              </div>
            </Fade>
          )}
        </Paper>
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
  loading: state.user.loading,
  registerError: state.user.registerError ? true : false,
  loginError: state.user.loginError ? true : false,
  registerSuccess: state.user.registerSuccess? true: false
}); // mapStateToProps()

/**
 * Maps the Component Functions to Redux
 * @name mapDispatchToProps
 * @param {dispatch} dispatch the dispatch entity
 * @returns The bound actions creators
 */
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
  login: (username, password) =>
    dispatch(UserActions.login(username, password)),
  register: (username, password) =>
    dispatch(UserActions.register(username, password))
}); // mapDispatchToProps()

// Exports the redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
