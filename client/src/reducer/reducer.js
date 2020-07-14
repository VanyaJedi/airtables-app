import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as app} from "./app/app.js";
import nameSpace from "./name-space.js";

export default combineReducers({
  [nameSpace.DATA]: data,
  [nameSpace.APP]: app,
});
