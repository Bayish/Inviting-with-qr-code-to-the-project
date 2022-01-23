import {Card, CardMedia } from "@mui/material";
import { makeStyles} from '@mui/styles';
import ReactPlayer from 'react-player'
import './responsive.css';

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
})

const GalleryItem = ({name, image, setId, id}) => {
    const classes = useStyles();

    let video;
    if (image) {
      const format = image.split('.');
      if(format[1] === 'mp4'){
         video = 'http://3.109.39.82/file/' + image;
        console.log(video)
      }
       image ='http://3.109.39.82/file/' + image;
    }

    const onHandleClick = (id) => {
      setId(id + 1)
    }

    return (
        <>
          {!video ? (
            <Card className={classes.card} onClick={() => onHandleClick(id)}>
              <CardMedia
                image={image}
                title={name}
                className={classes.media}
              />
            </Card>
          ) : (
            <div className='player-wrapper'>
              <ReactPlayer
                className='react-player'
                url={video}
                width='100%'
                height='100%'
                controls={true}
              />
            </div>
          )}
        </>
    )
};


export default GalleryItem;