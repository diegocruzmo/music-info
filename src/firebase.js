import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB_gSm_nExh0j6ctUiCTvuTwEJx55HfExs',
  authDomain: 'music-info-e74d8.firebaseapp.com',
  projectId: 'music-info-e74d8',
  storageBucket: 'music-info-e74d8.firebasestorage.app',
  messagingSenderId: '509063360118',
  appId: '1:509063360118:web:d8177e75939db94a33f957'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider, signOut, doc, setDoc, getDoc, addDoc, getDocs }
