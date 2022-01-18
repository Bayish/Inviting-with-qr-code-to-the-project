import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from '../UI/FileInput/FileInput';
import {createGalleryRequest} from "../../store/actions/galleriesActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const GalleryForm = ({loading}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
  });
  const [files, setFiles] = useState('');


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

    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i])
    }
    dispatch(createGalleryRequest(formData))
  };

  return (
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
          value={state.title}
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
            loading={loading}
            disabled={loading}
          >
            Create
          </ButtonWithProgress>
        </Grid>
      </form>
    </Grid>
  );
};

export default GalleryForm;