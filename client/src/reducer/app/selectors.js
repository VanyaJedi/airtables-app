
import nameSpace from "../name-space.js";

const NAME_SPACE = nameSpace.APP;


export const getActiveTab = (state) => {
    return state[NAME_SPACE].activeTab;
}