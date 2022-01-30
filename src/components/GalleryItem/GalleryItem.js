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

const GalleryItem = ({removeHandler, fileName, name, setId, id}) => {
    const classes = useStyles();
    console.log(fileName)

    let video;
    let image;
    if (fileName) {
      const format = fileName.split('.');
      if(format[1] === 'mp4'){
         video = 'http://3.109.39.82/file/' + fileName;
      }
       image ='http://3.109.39.82/file/' + fileName;
    }

    const onHandleClick = (id) => {
      setId(id + 1)
    }

    return fileName && (
        <>
          {!video ? (
            <Card className={classes.card} >
              <CardMedia
                image={image}
                title={name}
                className={classes.media}
                onClick={() => onHandleClick(id)}
              />
              <Button fullWidth variant="contained" color="primary" onClick={() => removeHandler(fileName)}><DeleteIcon/></Button>
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
              <Button fullWidth variant="contained" color="primary" onClick={() => removeHandler(fileName)}><DeletIcon/></Button>
            </div>
          )}
        </>
    )
};


export default GalleryItem;