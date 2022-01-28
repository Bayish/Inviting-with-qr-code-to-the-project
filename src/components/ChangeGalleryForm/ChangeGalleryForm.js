import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import {CircularProgress, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from '../UI/FileInput/FileInput';
import {changeGalleryRequest} from "../../store/actions/galleriesActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const GalleryForm = ({match}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const {changeLoading, galleries} = useSelector(state => state.galleries);

  let current;
  for (let gallery of galleries) {
    if (gallery.id === match.params.id) {
      current = gallery;
    }
  }

  const [state, setState] = useState({
    name: current?.name,
  });
  const [files, setFiles] = useState(current?.files);

  if(galleries < 1){
     history.push('/');
  }


  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const uploadFileHandler = (event) => {
    setFiles(event.target.files);
  };


  const fileSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('name', state.name)
    formData.append('id', match.params.id)

    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i])
    }
    dispatch(changeGalleryRequest(formData));
  };

  return changeLoading ? (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress/>
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      item
      direction="column"
      spacing={2}
      className={classes.root}
      autoComplete="off"
      noValidate
      m="40px auto"
      xs={10}
      lg={8}
    >
      <form onSubmit={fileSubmitHandler}>
        <FormElement
          fullWidth
          required
          label="Name"
          name="name"
          value={state.name}
          onChange={inputChangeHandler}
        />
        <FileInput onChange={uploadFileHandler}/>
        <Grid item xs={8}>
          <ButtonWithProgress
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={changeLoading}
            disabled={changeLoading}
          >
            Create
          </ButtonWithProgress>
        </Grid>
      </form>
    </Grid>
  );
};

export default GalleryForm;