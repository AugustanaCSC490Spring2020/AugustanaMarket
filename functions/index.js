// This is where all the cloud functions for our firebase project are held
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

// configuration info for algolia from the env in firebase
const appID = functions.config().algolia.app;
const adminKey = functions.config().algolia.key;

// creating algolia search with the index for sell and request
// these indices are following what firestore has and allows us
// to have a full text search with instant results
const client = algoliasearch(appID, adminKey);
const sellIndex = client.initIndex('sell');
const requestIndex = client.initIndex('request');

// this fion adds the information that was created in firestore's
// collection 'sell' to algolia's index sellunct
exports.addToSellIndex = functions.firestore.document('sell/{itemId}')
    .onCreate(snapshot => {
        const data = {...snapshot.data()};
        delete data.condition;
        delete data.displayName;
        delete data.email;
        const objectID = snapshot.id;

        return sellIndex.saveObject({...data, objectID});

    });

// this function updates the information in aloglia's index sell
// when there is an update in firestore's collection 'sell'
exports.updateSellIndex = functions.firestore.document('sell/{itemId}')
    .onUpdate(change => {
        const newData = {...change.after.data()};
        delete newData.condition;
        delete newData.displayName;
        delete newData.email;
        const objectID = change.after.id;
        
        return sellIndex.saveObject({...newData, objectID});
    });

// this function deletes the information in algolia's index sell
// when there is a deletion in firestore's collection 'sell'
exports.deleteFromSellIndex = functions.firestore.document('sell/{itemId}')
    .onDelete(snapshot => sellIndex.deleteObject(snapshot.id));

// this function adds the information that was created in firestore's
// collection 'request' to algolia's index request
exports.addToRequestIndex = functions.firestore.document('request/{itemId}')
    .onCreate(snapshot => {
        const data = {...snapshot.data()};
        delete data.condition;
        delete data.displayName;
        delete data.email;
        const objectID = snapshot.id;

        return requestIndex.saveObject({...data, objectID});

    });

// this function updates the information in aloglia's index request
// when there is an update in firestore's collection 'request'
exports.updateRequestIndex = functions.firestore.document('request/{itemId}')
    .onUpdate(change => {
        const newData = {...change.after.data()};
        delete newData.condition;
        delete newData.displayName;
        delete newData.email;
        const objectID = change.after.id;
        
        return requestIndex.saveObject({...newData, objectID});
    });

// this function deletes the information in algolia's index request
// when there is a deletion in firestore's collection 'request'
exports.deleteFromRequestIndex = functions.firestore.document('request/{itemId}')
    .onDelete(snapshot => requestIndex.deleteObject(snapshot.id));
