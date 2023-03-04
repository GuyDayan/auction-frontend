import axios from "axios";


// export const sendApiGetRequest = (request, callback) => {
//     axios.get(request)
//         .then(response => {
//             if (callback) {
//                 callback(response);
//             }
//         })
// }

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
