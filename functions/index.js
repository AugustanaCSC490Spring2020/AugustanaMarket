const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const appID = functions.config().algolia.app;
const adminKey = functions.config().algolia.key;

const client = algoliasearch(appID, adminKey);
const sellIndex = client.initIndex('sell');
const buyIndex = client.initIndex('buy');

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

exports.addToBuyIndex = functions.firestore.document('buy/{itemId}')
    .onCreate(snapshot => {
        const data = {...snapshot.data()};
        delete data.condition;
        delete data.displayName;
        delete data.email;
        const objectID = snapshot.id;

        return buyIndex.saveObject({...data, objectID});

    });

exports.updateBuyIndex = functions.firestore.document('buy/{itemId}')
    .onUpdate(change => {
        const newData = {...change.after.data()};
        delete newData.condition;
        delete newData.displayName;
        delete newData.email;
        const objectID = change.after.id;
        
        return buyIndex.saveObject({...newData, objectID});
    });

exports.deleteFromBuyIndex = functions.firestore.document('buy/{itemId}')
    .onDelete(snapshot => buyIndex.deleteObject(snapshot.id));
