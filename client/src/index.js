import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/app';
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer/reducer.js";
import {Operation as DataOperation, actionCreator as actionCreatorData} from "./reducer/data/data.js";
import {Operation as UserOperation} from "./reducer/user/user.js";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createAPI} from './api.js';
import * as serviceWorker from './serviceWorker';



/*const onUnauth = () => {
  store.dispatch(ActionCreatorUser.changeAuthStatus(authorizationStatus.NO_AUTH));
};*/

const api = createAPI(()=>{});

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(UserOperation.checkAuth())
.then(() => {
  Promise.all([
  store.dispatch(DataOperation.loadTasks()),
  store.dispatch(DataOperation.loadRoles()),
  store.dispatch(DataOperation.loadUnits()),
  store.dispatch(DataOperation.loadFunctions()),
  store.dispatch(DataOperation.loadRoleUnit())
]).then(()=> {
  store.dispatch(actionCreatorData.changeLoading(false));
})
})

/*Promise.all([
  store.dispatch(DataOperation.loadTasks()),
  store.dispatch(DataOperation.loadRoles()),
  store.dispatch(DataOperation.loadUnits()),
  store.dispatch(DataOperation.loadFunctions()),
  store.dispatch(DataOperation.loadRoleUnit())
]).then(()=> {
  store.dispatch(actionCreatorData.changeLoading(false));
})*/




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
