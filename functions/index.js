const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const appID = functions.config().algolia.app;
const adminKey = functions.config().algolia.key;

const client = algoliasearch(appID, adminKey);
const sellIndex = client.initIndex('sell');
const requestIndex = client.initIndex('request');

exports.addToSellIndex = functions.firestore.document('sell/{itemId}')
    .onCreate(snapshot => {
        const data = {...snapshot.data()};
        delete data.condition;
        delete data.displayName;
        delete data.email;
        const objectID = snapshot.id;

        return sellIndex.saveObject({...data, objectID});

    });

exports.updateSellIndex = functions.firestore.document('sell/{itemId}')
    .onUpdate(change => {
        const newData = {...change.after.data()};
        delete newData.condition;
        delete newData.displayName;
        delete newData.email;
        const objectID = change.after.id;
        
        return sellIndex.saveObject({...newData, objectID});
    });

exports.deleteFromSellIndex = functions.firestore.document('sell/{itemId}')
    .onDelete(snapshot => sellIndex.deleteObject(snapshot.id));

exports.addToRequestIndex = functions.firestore.document('request/{itemId}')
    .onCreate(snapshot => {
        const data = {...snapshot.data()};
        delete data.condition;
        delete data.displayName;
        delete data.email;
        const objectID = snapshot.id;

        return requestIndex.saveObject({...data, objectID});

    });

exports.updateRequestIndex = functions.firestore.document('request/{itemId}')
    .onUpdate(change => {
        const newData = {...change.after.data()};
        delete newData.condition;
        delete newData.displayName;
        delete newData.email;
        const objectID = change.after.id;
        
        return requestIndex.saveObject({...newData, objectID});
    });

exports.deleteFromRequestIndex = functions.firestore.document('request/{itemId}')
    .onDelete(snapshot => requestIndex.deleteObject(snapshot.id));
