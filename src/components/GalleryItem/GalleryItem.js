import {Card, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import { makeStyles} from '@mui/styles';
import {BASE_URL} from "../../config";

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
})

const GalleryItem = ({name, image, date}) => {
    const classes = useStyles();

    if (image) {
      image ='http://3.109.39.82/file/' + image;
    }

    return (
        <>
            <Card className={classes.card}>
                <CardMedia
                    image={image}
                    title={name}
                    className={classes.media}
                />
            </Card>
          <Typography>{date}</Typography>
        </>
    )
};


export default GalleryItem;