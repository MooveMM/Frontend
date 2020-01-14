import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import setupStore from './store/index';
import App from './App';

const { configureStore, persistor, history } = setupStore();

var theme = createMuiTheme({
    palette: {
        primary: {
            main: "#004d40",
        }, 
        secondary: {
            main: "#e5e5e5",
        }
      },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
    <Provider store={configureStore}>
        <PersistGate persistor={persistStore(persistor)} loading={null}>
            <MuiThemeProvider theme={theme}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
