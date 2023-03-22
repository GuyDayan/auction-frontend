import axios from "axios";
import {
    BASE_URL, GET_MY_PRODUCTS_REQUEST_PATH,
    GET_PRODUCTS_FOR_SALE_REQUEST_PATH, GET_STATS_REQUEST_PATH,
    GET_USER_DETAILS_REQUEST_PATH,
    GET_USER_DETAILS_URL_PARAM
} from "./Globals";


// export const sendApiGetRequest = (request, callback) => {
//     axios.get(request)
//         .then(response => {
//             if (callback) {
//                 callback(response);
//             }
//         })
// }

export const getProductsForSaleRequest  = (params, callback) => {
    const url = BASE_URL + GET_PRODUCTS_FOR_SALE_REQUEST_PATH;
    sendApiGetRequest(url,params,callback)
}

export const getMyProductsRequest  = (params, callback) => {
    const url = BASE_URL+ GET_MY_PRODUCTS_REQUEST_PATH;
    sendApiGetRequest(url,params,callback)
}

export const getStatsRequest = (params, callback) => {
    const url = BASE_URL+GET_STATS_REQUEST_PATH;
    sendApiGetRequest(url,params,callback)
}






export const sendApiGetRequest = (url ,params, callback) => {
    console.log(params)
    axios.get(url, {params} )
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


export const sendApiPostRequest = (url, params, callback) => {
    axios.post(url, null, {params})
        .then(response => {
        if (callback) {
            callback(response);
        }
    })
}
