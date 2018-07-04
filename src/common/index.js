import { call, put} from 'redux-saga/effects';
import React from 'react';
const cloneDeep = require('lodash/cloneDeep');
import {Loading} from 'components';
// saga请求封装
export function* callFetch(fetch, params) {
    return yield call(fetch, params);
}

// clone
export function CloneDeep(obj) {
    return cloneDeep(obj);
}

// set localStorage
export function setStorage(key, val) {
    let value = val;
    if (Array.isArray(val)) {
        return;
    } else if (!Array.isArray(val) && typeof val == 'object') {
        value = JSON.stringify(info);
    }
    return window.localStorage.setItem(key, value);
}

// get localStorage

export function getStorage(key) {
    return window.localStorage.getItem(key);
}


// delete localStorage
export function deleteStorage(key) {
    return window.localStorage.removeItem(key);
}


// delete all localStorage
export function deleteAllStorage() {
    return window.localStorage.clear();
}

// export function createTimer(callback, time, type = true) {
//     window.requestAnimationFrame =
//         window.requestAnimationFrame ||
//         window.webkitrequestAnimationFrame ||
//         window.mozrequestAnimationFrame ||
//         window.msrequestAnimationFrame ||
//         window.orequestAnimationFrame;
//     window.cancelAnimationFrame =
//         window.cancelAnimationFrame ||
//         window.webkitCancelAnimationFrame ||
//         window.mozCancelAnimationFrame ||
//         window.msCancelAnimationFrame ||
//         window.oCancelAnimationFrame;
//     let stime = null;
//     let etime = null;
//     if (typeof callback !== 'function' || typeof time !== "number") {
//         return
//     }
//     let _id  =  window.requestAnimationFrame(loop);
//     console.log(_id)
//     function loop(timestamp) {
//         if (stime == null) {
//             stime = timestamp;
//         }
//         etime = timestamp;
//         window.requestAnimationFrame(loop);

//         if (etime - stime >= time) {
//             stime = null;
//             etime = null;
//             callback && callback();

//             if (!type) {

//             }
//         }
//     }
//     return _id;
// }

// export function clearTimer(id) {
//     window.cancelAnimationFrame =
//         window.cancelAnimationFrame ||
//         window.webkitCancelAnimationFrame ||
//         window.mozCancelAnimationFrame ||
//         window.msCancelAnimationFrame ||
//         window.oCancelAnimationFrame;
//         window.cancelAnimationFrame(id);

// }


