const { initializeApp } = require('firebase-admin/app'); //admin SDK 초기화
const { getFirestore } = require('firebase-admin/firestore'); //firestore db 가져옴
const functions = require('firebase-functions/v1');

initializeApp();
const db = getFirestore();

//auth trigger
const { user }  = require('firebase-functions');

exports.onUserCreate = functions.auth.user().onCreate(async (user) => { //new 계정이 생길 때마다 실행됨

    console.log('▶ onUserCreate fired for uid:', user.uid);

    const uid = user.uid;
    const email = user.email || null;
    const name = user.displayName || 'New User';

    try {
        await db.collection('users').doc(uid).set({
            username: name,
            email: email,
            createdAt: new Date(),
            point: 0,
            level: 1, 
            questStatus: {},
            room: {
                theme: 'basic',
                furniture: []
            }
        });

        console.log(`초기 데이터 세팅 유저 : ${uid}`);
    } catch (err) {
        console.error(`실패 ㅅㄱ염 ${uid} :`, err);
    }
});
/*
exports.getUnlockedFurnitures = functions.https.onCall(async (database, context) => {
    //인증확인
    if(!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            '로그인이 필요합니다.'
        );
    }
    const uid = context.auth.uid;

    //유저 레벨 조회
    const userSnap = await db.collection('users').doc(uid).get();
    if (!userSnap.exists) {
        throw new functions.https.HttpsError(
            'not-found',
            '사용자 데이터를 찾을 수 없습니다.'
        );
    }
    const { level } = userSnap.data();

    // unlockLevel ≤ level 인 가구 쿼리
    const furniSnap = await db
        .collection('furnitures')
        .where('unlockLevel', '<=', level)
        .orderBy('unlockLevel')
        .get();

    //결과반환
    return furniSnap.docs.map(doc => {
        const d = doc.data();
        return {
            id: doc.id,
            name: d.name,
            assetPath: d.assetPath,
            iconUrl: d.iconUrl,
            unlockLevel: d.unlockLevel,
            categoty: d.categoty
        };
    });
});
*/
