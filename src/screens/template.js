import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../screens/global.css';

/**
 * A component that renders ...
 * @module Template
 * @extends Component
 * @author IBM - Cathrine Søby Rathje
 * @since 1.0
 */
 class Template extends React.Component {

  /**
   * Default render fn for the Template component
   * @public
   * @method
   * @name render
   * @returns renders the template page wrapped in a <div> tag.
   */
  render() {
    return (
      <div>
        Hello
      </div>
    )
  } // render()
} // Template.js

/**
 * @name mapStateToProps
 * @description Maps the Component Props to the Redux Props
 * @param {object} state the redux state
 * @returns the mapped props
 */
const mapStateToProps = state => ({

}); // mapStateToProps()

/**
 * Maps the Component Functions to Redux
 * @name mapDispatchToProps
 * @param {dispatch} dispatch the dispatch entity
 * @returns The bound actions creators
 */
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      
    },
    dispatch
  )
}); // mapDispatchToProps()

// Exports the redux connected component
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Template);