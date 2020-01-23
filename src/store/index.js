import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import storage from 'redux-persist/lib/storage';
import UserReducer from '../_reducers/user'
import QuestionaireReducer from '../_reducers/questionaire'
// Init the history variable
const history = createBrowserHistory();

export default function setupStore() {
  const middlewares = [ReduxThunk, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  /**
   * Combines all the reducers
   * @name combineReducers
   * @param {object} clientHistory the active history to use for react router
   */
  const combinedReducers = clientHistory => combineReducers({
    router: connectRouter(clientHistory),
    user: UserReducer,
    questionaire: QuestionaireReducer
  }); // combineReducers()

  const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, combinedReducers(history));

  const configureStore = createStore(persistedReducer, composeWithDevTools(composedEnhancers));

  // Init the persistor before returning
  const persistor = configureStore;
  return { configureStore, persistor, history };
}
