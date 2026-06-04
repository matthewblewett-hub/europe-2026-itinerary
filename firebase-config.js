// firebase-config.js — initialise Firebase once, expose window.fbDb and window.fbStorage

(function () {
    const FIREBASE_CONFIG = {
        apiKey:            "AIzaSyDf1i_Q5669_OlmXWS94UVhlc-RW-dVedA",
        authDomain:        "europe-trip-2026-11512.firebaseapp.com",
        databaseURL:       "https://europe-trip-2026-11512-default-rtdb.firebaseio.com",
        projectId:         "europe-trip-2026-11512",
        storageBucket:     "europe-trip-2026-11512.firebasestorage.app",
        messagingSenderId: "524211349534",
        appId:             "1:524211349534:web:d2ce16f1b1c447b8fbe60f"
    };

    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    window.fbDb = (typeof firebase !== 'undefined') ? firebase.database() : null;

    // Storage may not be enabled yet — catch gracefully
    try {
        window.fbStorage = (typeof firebase !== 'undefined' && typeof firebase.storage === 'function')
            ? firebase.storage()
            : null;
    } catch (e) {
        console.warn('Firebase Storage not available:', e.message);
        window.fbStorage = null;
    }
})();
