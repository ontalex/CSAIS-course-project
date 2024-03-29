// Создать 3 redusers (slices):
// + user (token, role),
// + group (groupID),
// + schedule (date, order: {dateStart, dateEnd})

import { createSlice } from "@reduxjs/toolkit";

const init = { token: undefined, role: undefined };

export const userSlice = createSlice({
    name: "userSlice",
    initialState: init,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role
        }
    }
})

