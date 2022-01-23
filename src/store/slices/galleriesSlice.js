import {createSlice} from "@reduxjs/toolkit";

const name = 'galleries';

export const initialState = {
  fetchLoading: false,
  fetchError: null,
  fetchSingleLoading: false,
  fetchSingleError: null,
  createLoading: false,
  createError: null,
  changeLoading: false,
  changeError: null,
  removeLoading: false,
  removeError: null,
  galleries: [],
  gallery: null,
};

const galleriesSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchGalleriesRequest(state){
      state.fetchLoading = true;
      state.fetchError = null;
    },
    fetchGalleriesSuccess(state, {payload: galleries}){
      state.fetchLoading = false;
      state.galleries = galleries;
      state.fetchError = null;
    },
    fetchGalleriesFailure(state, {payload: error}){
      state.fetchLoading = false;
      state.fetchError = error;
    },
    fetchGalleryRequest(state){
      state.fetchSingleLoading = true;
      state.fetchSingleError = null;
    },
    fetchGallerySuccess(state, {payload: gallery}){
      state.fetchSingleLoading = false;
      state.gallery = gallery;
      state.fetchSingleError = null;
    },
    fetchGalleryFailure(state, {payload: error}){
      state.fetchSingleLoading = false;
      state.fetchSingleError = error;
    },
    createGalleryRequest(state){
      state.createLoading = true;
      state.createError = null;
    },
    createGallerySuccess(state, {payload: gallery}){
      state.createLoading = false;
      state.createError = false;
      state.galleries = [...state.galleries, gallery]
    },
    createGalleryFailure(state, {payload: error}){
      state.createLoading = false;
      state.createError = error;
    },
    removeGalleryRequest(state){
      state.removeLoading = true;
      state.removeError = null;
    },
    removeGallerySuccess(state, {payload: id}){
      state.removeLoading = false;
      state.removeError = null;
      state.galleries = state.galleries.filter(g => g.id !== id);
    },
    removeGalleryFailure(state, {payload: error}){
      state.removeLoading = false;
      state.removeError = error;
    },
    changeGalleryRequest(state){
      state.changeLoading = true;
      state.changeError = null;
    },
    changeGallerySuccess(state, {payload: updatedGallery}){
      state.changeLoading = false;
      state.changeError = null;
      state.galleries = state.galleries.map(g => g.id === updatedGallery.id ? updatedGallery : g);
    },
    changeGalleryFailure(state, {payload: error}){
      state.changeLoading = false;
      state.changeError = error;
    }
  }
});

export default galleriesSlice;