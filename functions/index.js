const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");

admin.initializeApp();

exports.rewardOnQuestSuccess = functions.firestore
    .document("quests/{questID")
    .onUpdate(async (change, context) => {
        const before = change.before.data();
        const after = change.after.data();

        if (before.result !== "success" && after.result === "success") {
            const userID = after.userID;
            const userRef = admin.firestore().collection("users").doc(userID);

            
            await userRef.update({
                point: admin.firestore.FieldValue.increment(5),
            });

            console.log(`${userID}님에게 포인트 +5 부여 완료!`);
        }
    });