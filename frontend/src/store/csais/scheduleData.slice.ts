// Создать 3 redusers (slices):
// + user (token, role),
// + group (groupID),
// + schedule (date, order: {dateStart, dateEnd})

import { createSlice } from "@reduxjs/toolkit";

const init = {
    date: undefined,
    order: {
        dateStart: undefined,
        dateEnd: undefined
    }
};

export const scheduleSlice = createSlice({
    name: "scheduleSlice",
    initialState: init,
    reducers: {
        setDataSchedule: (state, action) => {
            state.date = action.payload.date;
        },
        setDateOrder: (state, action) => {
            state.order.dateStart = action.payload.order.dateStart;
            state.order.dateEnd = action.payload.order.dateEnd;
        }
    }
}) 