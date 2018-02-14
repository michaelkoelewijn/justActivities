import * as firebase from 'firebase';

export var config = {
    apiKey: "AIzaSyDXNaFSL3tAO4jDRc-thQAgoV8UXt3ECRE",
    authDomain: "justactivities-72891.firebaseapp.com",
    databaseURL: "https://justactivities-72891.firebaseio.com",
    projectId: "justactivities-72891",
    storageBucket: "",
    messagingSenderId: "951386938099"
}

firebase.initializeApp(config);
var db = firebase.database();

export default db;


export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val(); 
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};