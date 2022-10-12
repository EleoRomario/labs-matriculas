const admin = require("firebase-admin");

const serviceAccount = require("./adminCred.json");
if(!admin.apps.length){
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://matriculasepis.firebaseio.com",
});
}
export const firestore = admin.firestore();
