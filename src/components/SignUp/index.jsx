import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import useUsers from '../../hooks/useUsers'
import { Link } from 'wouter'

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  const { createUser } = useUsers()

  const onSubmit = ({ email, password, name }) => {
    createUser({ email, password, name })
  }

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <Container maxWidth='sm'>
        <Box sx={{ mt: 4 }}>
          <Typography variant='h4' component='h1' align='center' gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='name'
              control={control}
              defaultValue=''
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Email'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Password'
                  type='password'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Controller
              name='confirmPassword'
              control={control}
              defaultValue=''
              rules={{
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Confirm Password'
                  type='password'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ''
                  }
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
              Sign Up
            </Button>
            <Typography
              sx={{ display: 'block', mt: 2 }}
              component={Link}
              align='center'
              href='/'
            >
              If you already have an account, please click here!
            </Typography>
          </form>
        </Box>
      </Container>
    </div>
  )
}

export default SignUp
