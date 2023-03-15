import axios from "axios";
import {BASE_URL, GET_USER_DETAILS_REQUEST_PATH, GET_USER_DETAILS_URL_PARAM} from "./Globals";


// export const sendApiGetRequest = (request, callback) => {
//     axios.get(request)
//         .then(response => {
//             if (callback) {
//                 callback(response);
//             }
//         })
// }



export const getUserDetails = (params, callback) => {
    axios.get(BASE_URL+GET_USER_DETAILS_REQUEST_PATH, null, {params}).then(response => {
        if (callback) {
            callback(response);
        }
    })
}

export const sendApiGetRequest = (url ,params, callback) => {
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
