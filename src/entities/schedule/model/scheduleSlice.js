import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// --- THUNKS ---
export const fetchSchedules = createAsyncThunk(
  'schedules/fetchSchedules',
  async (school_id, { rejectWithValue }) => {
    try {
      const response = await APIs.schedule.getAllSchedulesWhere({ school_id });
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const addSchedule = createAsyncThunk(
  'schedules/addSchedule',
  async (data, { rejectWithValue }) => {
    try {
      const response = await APIs.schedule.addSchedule(data);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const updateSchedule = createAsyncThunk(
  'schedules/updateSchedule',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await APIs.schedule.updateSchedule(id, data);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  'schedules/deleteSchedule',
  async (id, { rejectWithValue }) => {
    try {
      const response = await APIs.schedule.deleteSchedule(id);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

// --- SLICE ---
const initialState = {
  schedules: [],
  currentSchedule: null,
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    // устанавливаем выбранное расписание
    selectSchedule: (state, { payload }) => {
      state.currentSchedule = payload;
    },
    // очищаем выбор
    clearCurrentSchedule: state => {
      state.currentSchedule = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // ======== fetchSchedules ========
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        // Сортируем по дню недели и времени начала
        const sortedPayload = action.payload.slice().sort((a, b) => {
          // Сначала по дню недели
          if (a.weekday !== b.weekday) {
            return a.weekday - b.weekday;
          }

          // Затем по времени начала
          const timeA = new Date(`1970-01-01T${a.start_time}`);
          const timeB = new Date(`1970-01-01T${b.start_time}`);
          return timeA - timeB;
        });

        state.schedules = sortedPayload.map(schedule => ({
          id: schedule.id,
          group_id: schedule.group_id,
          group_name: schedule.Group.name,
          weekday: schedule.weekday,
          start_time: schedule.start_time,
          duration_minutes: schedule.duration_minutes,
          school_id: schedule.school_id,
          active_from: schedule.active_from,
          active_to: schedule.active_to
        }));

        state.loading = false;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== addSchedule ========
      .addCase(addSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        const newSchedule = action.payload;
        state.schedules.push({
          id: newSchedule.id,
          group_id: newSchedule.group_id,
          weekday: newSchedule.weekday,
          start_time: newSchedule.start_time,
          duration_minutes: newSchedule.duration_minutes,
          school_id: newSchedule.school_id,
          active_from: newSchedule.active_from,
          active_to: newSchedule.active_to
        });

        // Пересортировка после добавления
        state.schedules.sort((a, b) => {
          if (a.weekday !== b.weekday) return a.weekday - b.weekday;
          const timeA = new Date(`1970-01-01T${a.start_time}`);
          const timeB = new Date(`1970-01-01T${b.start_time}`);
          return timeA - timeB;
        });

        state.loading = false;
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== updateSchedule ========
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        const updatedSchedule = action.payload;
        const index = state.schedules.findIndex(s => s.id === updatedSchedule.id);

        if (index !== -1) {
          state.schedules[index] = {
            id: updatedSchedule.id,
            group_id: updatedSchedule.group_id,
            weekday: updatedSchedule.weekday,
            start_time: updatedSchedule.start_time,
            duration_minutes: updatedSchedule.duration_minutes,
            school_id: updatedSchedule.school_id,
            active_from: updatedSchedule.active_from,
            active_to: updatedSchedule.active_to
          };

          // Пересортировка после обновления
          state.schedules.sort((a, b) => {
            if (a.weekday !== b.weekday) return a.weekday - b.weekday;
            const timeA = new Date(`1970-01-01T${a.start_time}`);
            const timeB = new Date(`1970-01-01T${b.start_time}`);
            return timeA - timeB;
          });
        }

        state.loading = false;
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== deleteSchedule ========
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.schedules = state.schedules.filter(s => s.id !== deletedId);
        state.loading = false;
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  selectSchedule,
  clearCurrentSchedule
} = scheduleSlice.actions;

// Селекторы
export const selectSchedules = (state) => state.schedule.schedules;
export const selectSchedulesLoading = (state) => state.schedule.loading;
export const selectSchedulesError = (state) => state.schedule.error;
export const selectCurrentSchedule = state => state.schedule.currentSchedule;

export default scheduleSlice.reducer;