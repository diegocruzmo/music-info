import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth, setDoc, getDoc, doc, db } from '../firebase'
import toast from 'react-hot-toast'

const useUsers = () => {
  const createUser = ({ email, password, name }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        user.displayName = name
        createDoc({ user })
        toast.success('User created successful!')
      })
      .catch((error) => {
        const errorMessage = error.message
        toast.error(errorMessage)
      })
  }

  const createDoc = async ({ user }) => {
    if (!user) return

    const checkData = await getDoc(doc(db, 'albums', user.uid))

    if (!checkData.exists()) {
      const data = {
        name: user.displayName,
        email: user.email,
        createdAt: user.metadata.creationTime
      }

      try {
        await setDoc(doc(db, 'albums', user.uid), data)
        toast.success('Document created success!')
      } catch (error) {
        const errorMessage = error.message
        toast.error(errorMessage)
      }
    } else {
      toast.error('Doc already exists')
    }
  }

  const loginUser = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        toast.success('Log In successful!')
      })
      .catch((error) => {
        const errorMessage = error.message
        toast.error(errorMessage)
      })
  }

  return { createUser, loginUser }
}

export default useUsers
