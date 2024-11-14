import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Typography, Box, Modal } from '@mui/material'
import { collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, addDoc, db } from '../../firebase'
import toast from 'react-hot-toast'

const useAlbum = () => {
  const [user] = useAuthState(auth)

  const addAlbum = async (data) => {
    const newAlbum = {
      name: data.name,
      band: data.band,
      year: data.year,
      link: data.link
    }

    try {
      const docRef = await addDoc(
        collection(db, `albums/${user.uid}/records`),
        newAlbum
      )
      console.log('Document written with ID: ', docRef.id)
      toast.success('Album added!')
    } catch (error) {
      const errorMessage = error.message
      toast.error(errorMessage)
    }
  }

  return { addAlbum }
}

const ModalForm = ({ openModal, handleModal, fetchAlbums }) => {
  const { addAlbum } = useAlbum()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleClose = () => {
    handleModal(!openModal)
  }

  const onSubmit = (data) => {
    addAlbum(data)
    fetchAlbums()
    handleClose()
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant='h4' component='h1' align='center' gutterBottom>
            Add Album
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='name'
              control={control}
              defaultValue=''
              rules={{ required: 'Album name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Album Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                />
              )}
            />

            <Controller
              name='band'
              control={control}
              defaultValue=''
              rules={{ required: 'Band name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Band Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.band}
                  helperText={errors.band ? errors.band.message : ''}
                />
              )}
            />

            <Controller
              name='year'
              control={control}
              defaultValue=''
              rules={{ required: 'Album year is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Album Year'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.year}
                  helperText={errors.year ? errors.year.message : ''}
                />
              )}
            />

            <Controller
              name='link'
              control={control}
              defaultValue=''
              rules={{ required: 'Album link is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Album Link'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.link}
                  helperText={errors.link ? errors.link.message : ''}
                />
              )}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

ModalForm.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired
}

export default ModalForm
