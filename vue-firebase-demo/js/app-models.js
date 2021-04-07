// Recipe Model
var Recipe = function(){
    return {
        name: '',
        image: null,
        description: '',
        ingredients: [''],
        directions: [''],
        rating: 0,
    }
};


// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCEmcgC1tPF-H0FnMYzt2A4H2wx-NWGoHg",
    authDomain: "javascript2spring2021.firebaseapp.com",
    projectId: "javascript2spring2021",
    storageBucket: "javascript2spring2021.appspot.com",
    messagingSenderId: "357211795442",
    appId: "1:357211795442:web:4ab6769b8c209997a7056b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Create references to firestore and storage
const db = firebase.firestore();
const storage = firebase.storage().ref();
