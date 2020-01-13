import React from 'react';
import './App.css';
import { connect } from 'react-redux';
//Import all screens here:


/**
 * A component that renders the start point of the app
 * @module App
 * @extends Component
 * @author IBM - Cathrine Søby Rathje
 * @since 1.0
 */
class App extends React.Component {
  
  /**
   * Default render fn for the App component
   * @public
   * @method
   * @name render
   * @returns renders the main app page based on whether the user is logged in or not
   */
  render () {
    return <div>Hi</div>;
  } // render()
} // App.js

/**
 * @name mapStateToProps
 * @description Maps the Component Props to the Redux Props
 * @param {object} state the redux state
 * @returns the mapped props
 */
const mapStateToProps = state => ({
}); // mapStateToProps()

// Exports the redux connected component
export default connect(mapStateToProps, null)(App);