import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Button, Typography, CircularProgress, Link} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {fetchGalleriesRequest, removeGalleryRequest} from "../../../store/actions/galleriesActions";
import {Link as RouterLink} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: "50px",
    },
  },
  box: {
    background: 'white',
    borderRadius: '10px',
    padding: '15px',
    margin: '30px 0 0 0'
  },
  item: {
    padding: '10px',
    border: '2px solid rgba(29, 29, 31, 0.43)',
    borderRadius: '5px'
  },
  button: {
    marginRight: '10px'
  }
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {fetchLoading, galleries} = useSelector(state => state.galleries);

  console.log(galleries)

  useEffect(() => {
    dispatch(fetchGalleriesRequest());
  }, [dispatch]);



  return (
    <Grid className="container" container direction="column">
      <Grid item container justifyContent="space-between" alignItems="center" mt={4}>
        <Grid item className={classes.title}>
          <Typography variant="h4">Gallery</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={RouterLink} to="/create">Add</Button>
        </Grid>
      </Grid>
      {fetchLoading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <CircularProgress/>
          </Grid>
        </Grid>
      ) : (
        <Grid item className={classes.box} container direction="column" xs={12} mt={7}>
          {galleries.map((g, i) => (
            <Grid className={classes.item} key={i} item container justifyContent="space-between" mt={2} xs={12}>
              <Typography>{g.name}</Typography>
              <Typography>{g.createdDate}</Typography>
              <Grid item container justifyContent="space-between" xs={12} lg={4} mt={2}>
                <Button  variant="contained" component={Link} href={"http://3.109.39.82:8080/gallery/qr/generate/" + g.id} download>Generate Qr Code</Button>
                <Button onClick={() => dispatch(removeGalleryRequest(g.id))}><DeleteIcon/></Button>
                <Button component={RouterLink} to={`/gallery/${g.galleryCode}`}><ArrowForwardIcon/></Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Home;