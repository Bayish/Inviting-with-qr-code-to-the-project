import {createSlice} from "@reduxjs/toolkit";

const name = 'history';

const historySlice = createSlice({
  name,
  reducers: {
    historyPush() {},
    historyReplace() {},
    historyBack() {},
  }
});

export default historySlice;