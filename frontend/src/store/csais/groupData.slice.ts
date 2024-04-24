import { createSlice } from "@reduxjs/toolkit";

const init = { groupID: undefined };

export const groupSlice = createSlice({
    name: "groupSlice",
    initialState: init,
    reducers: {
        setGroup: (state, action) => {
            console.log(" >> SET GROUP - reduser");
            state.groupID = action.payload.groupID;
        }
    }
}) 