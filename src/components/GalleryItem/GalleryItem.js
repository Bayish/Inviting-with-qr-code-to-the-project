import {Card, CardMedia, Button } from "@mui/material";
import { makeStyles} from '@mui/styles';
import ReactPlayer from 'react-player'
import './responsive.css';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
})

const GalleryItem = ({name, setId, id,  user, removeHandler, fileName}) => {
    const classes = useStyles();

    let video;
    let image;
    if (typeof fileName !== 'undefined') {
      const format = fileName.split('.');
      if(format[1] === 'mp4'){
         video = 'http://3.109.39.82/file/' + fileName;
      }else{
        image ='http://3.109.39.82/file/' + fileName;
      }
    }

    const onHandleClick = (id) => {
      setId(id + 1)
    }

    return  (
        <>
          {!video ? (
            <Card className={classes.card} >
              <CardMedia
                image={fileName === undefined ? '' : image}
                title={name}
                onError={(e) => {e.target.onerror = null; e.target.src={image}}}
                className={classes.media}
                onClick={() => onHandleClick(id)}
              />
              {user &&  <Button fullWidth variant="contained" color="primary" onClick={() => removeHandler(fileName)}><DeleteIcon/></Button>}
            </Card>
          ) : (
            <div className='player-wrapper'>
              <ReactPlayer
                className='react-player'
                url={fileName === undefined ? '' : video}
                width='100%'
                height='100%'
                controls={true}
                onError={(e) => {e.target.onerror = null; e.target.src= {video}}}
              />
              {user &&  <Button fullWidth variant="contained" color="primary" onClick={() => removeHandler(fileName)}><DeleteIcon/></Button>}
            </div>
          )}
        </>
    )
};


export default GalleryItem;