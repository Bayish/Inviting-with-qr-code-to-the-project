import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import GalleryItem from "../../../components/GalleryItem/GalleryItem";
import {useDispatch, useSelector} from 'react-redux';
import {fetchGalleryRequest, removePhotoRequest} from "../../../store/actions/galleriesActions";
import Modal from "../../../components/UI/Modal/Modal";
import ReactPlayer from "react-player";
import '../../../components/GalleryItem/responsive.css';

const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: "50px",
    },
  }
}));


const Main = ({match}) => {
  const classes = useStyles();
  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const {gallery, fetchSingleLoading} = useSelector(state => state.galleries);
  const {user} = useSelector(state => state.users);
  const purchaseCloseHandler = () => {
    setId(0)
  }


  useEffect(() => {
    dispatch(fetchGalleryRequest(match.params.id));
  }, [dispatch, match.params.id]);

  let image;
  let video;

  if (id !== 0) {
    const number = id - 1;
    image = gallery?.files[number]?.fileName;
    const format = image.split('.');
    if(format[1] === 'mp4'){
       video = image;
    }
  }

  const removeHandler = data => {
    dispatch(removePhotoRequest({galleryId: gallery.id, fileName: data, paramsId: match.params.id}));
  }

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
                justifyContent="space-evenly"
                m={1}
                spacing={2}
              >
                {
                  gallery?.files?.map((c, i) => (
                    <Grid key={i} item xs={12} sm={12} md={6} lg={4}>
                      <GalleryItem
                        removeHandler={removeHandler}
                        name={gallery.name}
                        fileName={c.fileName}
                        date={gallery.createdDate}
                        setId={setId}
                        user={user}
                        id={i}
                      />
                    </Grid>
                  ))
                }
              </Grid>
              <Grid>
                <Modal show={id !== 0} close={purchaseCloseHandler}>
                      {!video && image ? (
                        <div >
                          <img style={{width: '100%', height: 'auto', maxWidth: '700px'}} src={`http://3.109.39.82/file/` + image} alt="galleryPhoto"/>
                        </div>
                      ) : (
                        <div className='player-wrapper'>
                          <ReactPlayer
                            className='react-player'
                            url={`http://3.109.39.82/file/` + video}
                            width='100%'
                            height='100%'
                            controls={true}
                          />
                        </div>
                      )}
                </Modal>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;


// <div>
//   <img src={`http://3.109.39.82/file/ + ${gallery.files[id - 1].fileName}`} alt="galleryPhoto"/>
// </div>