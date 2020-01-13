import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import App from './App';

// Bind the react modal to the root element
Modal.setAppElement('#root');
/**
 * A component that renders the setup of the app and the routes
 * @module Setup
 * @extends Component
 * @since 1.0
 * @author Cathrine Søby Rathje
 */
class Setup extends Component {

  /**
   * default render fn of the Setup component
   * @public
   * @method
   * @name render
   * @returns the setup view wrapped in a <div> tag
   */
  render() {
    return (
        <div>
          <Switch>

            <Route path="/" exact component={App} />

            <Route component={App} />
          </Switch>
        </div>
    );
  } // render()
} // Setup.js

/**
 * @name mapStateToProps
 * @description Maps the Component Props to the Redux Props
 * @param {object} state the redux state
 * @returns the mapped props
 */
const mapStateToProps = state => ({
}); // mapStateToProps()

// Exports the redux connected Setup component
export default connect(
  mapStateToProps,
  null
)(Setup);
