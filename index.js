const express = require('express')
const app = express()
const cors = require('cors')
const {initializeApp} = require('firebase/app')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0gNHR2WxKxj-Z70Fw130D2N6fKVEFgEs",
  authDomain: "voice-based-system.firebaseapp.com",
  projectId: "voice-based-system",
  storageBucket: "voice-based-system.appspot.com",
  messagingSenderId: "53246083698",
  appId: "1:53246083698:web:d181e32cb07b5c503a38eb"
};

// Initialize Firebase


const {getFirestore, addDoc, collection} = require('firebase/firestore')

const my_firebase = initializeApp(firebaseConfig);
const db = getFirestore(my_firebase);

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('', (req, res) => {
    res.send('Hello World')
})


app.post('/api/input', (req, res) => {
    const medicine = req.body.medicine;
    const dose = req.body.dose;
    const expiry_date = req.body.expiry_date;
    const usage = req.body.usage;
    const unit = req.body.unit;
   addDoc(collection(db, 'Medications'), {
        medication: medicine,
        dose: dose,
        expiry_date: expiry_date,
        usage: usage,
        unit: unit
    }).then(data => {
        res.json({success_message: 'Medicine is added'})
    }).catch(err => {
        res.json(err)
    }) 

})

app.listen(5000, () => {
    console.log('Server is running on port 3000')
})