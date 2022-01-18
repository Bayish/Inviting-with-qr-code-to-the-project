import React, {useEffect} from 'react';
import {CircularProgress, Grid, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import GalleryItem from "../../../components/GalleryItem/GalleryItem";
import {useDispatch, useSelector} from 'react-redux';
import {fetchGalleryRequest} from "../../../store/actions/galleriesActions";

const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: "50px",
    },
  }
}));


const Main = ({match}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { gallery, fetchSingleLoading} = useSelector(state => state.galleries);


  useEffect(() => {
    dispatch(fetchGalleryRequest(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Grid container direction="column" spacing={2} className="container">
      <Grid item>
        <Grid item container justifyContent="center" direction="row" spacing={1}>
          {fetchSingleLoading ? (
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <CircularProgress/>
              </Grid>
            </Grid>
          ) : (
           <>
             <Typography className={classes.title} variant="h2">{gallery?.name}</Typography>
             <Grid
               container
               flexdirection="column"
               justifyContent="space-between"
               m={3}
             >
                 {
                   gallery?.files?.map((c, i) => (
                     <Grid key={i} item xs={12} sm={12} md={6} lg={3}>
                       <GalleryItem
                         id={c.id}
                         name={gallery.name}
                         image={c.fileName}
                         date={gallery.createdDate}
                       />
                     </Grid>
                    ))
                 }
             </Grid>
           </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;