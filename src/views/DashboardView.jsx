import { Fab, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ModalForm from '../components/ModalForm'
import Cards from '../components/Cards'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, query } from 'firebase/firestore'
import { db, getDocs, auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const DashboardView = () => {
  const [openModal, setOpenModal] = useState(false)
  const [albums, setAlbums] = useState([])
  const [user] = useAuthState(auth)

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const fetchAlbums = async () => {
    if (user) {
      const q = query(collection(db, `albums/${user.uid}/records`))
      const querySnapshot = await getDocs(q)

      const albumsArray = []
      querySnapshot.forEach((doc) => albumsArray.push(doc.data()))

      setAlbums(albumsArray)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  return (
    <div>
      <Cards albums={albums} />
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <Fab onClick={handleModal} color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
      {openModal && (
        <ModalForm
          openModal={openModal}
          handleModal={handleModal}
          fetchAlbums={fetchAlbums}
        />
      )}
    </div>
  )
}

export default DashboardView
