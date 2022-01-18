import React from 'react';
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import GalleryForm from "../../../components/GalleryForm/GalleryForm";

const NewGallery = () => {
    const {createLoading, createError} = useSelector(state => state.galleries);

    return (
       <>
           <Typography variant="h4">New gallery</Typography>
           <GalleryForm
               error={createError}
               loading={createLoading}
           />
       </>
    );
};

export default NewGallery;