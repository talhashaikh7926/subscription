import { combineReducers } from "redux";
import login from "./login/login.reducer";
import getSubscriptionPlan from "./subscriptionPlan/subscriptions.reducer";
import getUserInfo from "./userInfo/userInfo.reducer";
import getConfiguration from "./configurationData/configuration.reducer";
import templates from "./barcodeForm/template.reducer";
import barcodeDetails from "./barcodeForm/barcodeDetails.reducer";
import getCategory from "./barcodeForm/categories.reducer";
import location from "./location/location.reducer";
import getVideos from "./video/video.action";
import getFaq from "./faq/faq.action";
import getSubscription from "./subscription/subscription.reducer" 
import Shopifylocation from "./location/shopifyLocation.reducer"
import getShopifyType from "./barcodeForm/shopifyType.reducer"

export default combineReducers({
    login,
    location,
    getSubscriptionPlan,
    getUserInfo,
    getConfiguration,
    templates,
    barcodeDetails,
    getCategory,
    getVideos,
    getSubscription,
    getFaq,
    Shopifylocation,
    getShopifyType

});
