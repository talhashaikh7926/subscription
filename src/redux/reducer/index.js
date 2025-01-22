import { combineReducers } from "redux";
import login from "./login/login.reducer";
import getSubscriptionPlan from "./subscriptionPlan/subscriptions.reducer";
import getUserInfo from "./userInfo/userInfo.reducer";
import getConfiguration from "./configurationData/configuration.reducer";
import templates from "./barcodeForm/template.reducer";
import barcodeDetails from "./barcodeForm/barcodeDetails.reducer";
import getCategory from "./barcodeForm/categories.reducer";
import location from "./location/location.reducer";

export default combineReducers({
    login,
    location,
    getSubscriptionPlan,
    getUserInfo,
    getConfiguration,
    templates,
    barcodeDetails,
    getCategory

});
