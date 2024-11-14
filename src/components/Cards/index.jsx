import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container
} from '@mui/material'

export default function Cards({ albums }) {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} justifyContent='center'>
        {albums.map((album, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            display='flex'
            justifyContent='center'
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 200 }}
                image='https://media.istockphoto.com/id/1324638796/vector/realistic-vinyl-disc-mockup-in-empty-blank-music-album-cover-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=kHlrs3SspeLp7hfoZ9MCZceDoAnnLnnIayFGwznlCAI='
                title='cover album'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {album.name}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {album.band} - {album.year}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={album.link}>Link</a>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
