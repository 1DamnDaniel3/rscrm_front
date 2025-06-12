import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// --- THUNKS ---
export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async (school_id, { rejectWithValue }) => {
    try {
      const response = await APIs.lesson.getFilteredLessons({ school_id });
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const addLesson = createAsyncThunk(
  'lessons/addLesson',
  async (data, { rejectWithValue }) => {
    try {
      const response = await APIs.lesson.addLesson(data);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const updateLesson = createAsyncThunk(
  'lessons/updateLesson',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await APIs.lesson.updateLesson(id, data);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'lessons/deleteLesson',
  async (id, { rejectWithValue }) => {
    try {
      const response = await APIs.lesson.deleteLesson(id);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const getLessonById = createAsyncThunk(
  'lessons/getLessonById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await APIs.lesson.getLessonById(id);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const generateLessons = createAsyncThunk(
  'lessons/generateLessons',
  async (data, { rejectWithValue }) => {
    try {
      const response = await APIs.lesson.generateLessons(data);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка генерации занятий';
      return rejectWithValue(serverMessage);
    }
  }
);

// --- SLICE ---
const initialState = {
  lessons: [],
  currentLesson: null,
  loading: false,
  error: null,
  generating: false,
  generateError: null
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    chooseLesson: (state, { payload }) => {
      state.currentLesson = payload;
    },
    clearCurrentLesson: state => {
      state.currentLesson = null;
    },
    clearGenerateState: state => {
      state.generating = false;
      state.generateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // ======== fetchLessons ========
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.lessons = action.payload.map(lesson => ({
          id: lesson.id,
          group_id: lesson.group_id,
          direction_id: lesson.direction_id,
          teacher_id: lesson.teacher_id,
          start_time: lesson.start_time,
          lesson_date: lesson.lesson_date,
          duration_minutes: lesson.duration_minutes,
          is_canceled: lesson.is_canceled,
          school_id: lesson.school_id,
          group_name: lesson.Group?.name || '',
          dance_style: lesson.DanceStyle?.name || '',
          teacher_name: lesson.UserAccount?.UserProfile?.full_name || ''
        })).sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        state.loading = false;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== addLesson ========
      .addCase(addLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        const newLesson = action.payload;
        state.lessons.push({
          id: newLesson.id,
          group_id: newLesson.group_id,
          direction_id: newLesson.direction_id,
          teacher_id: newLesson.teacher_id,
          start_time: newLesson.start_time,
          lesson_date: newLesson.lesson_date,
          duration_minutes: newLesson.duration_minutes,
          is_canceled: newLesson.is_canceled,
          school_id: newLesson.school_id,
          group_name: newLesson.Group?.name || '',
          dance_style: newLesson.DanceStyle?.name || '',
          teacher_name: newLesson.UserAccount?.UserProfile?.full_name || ''
        });
        state.lessons.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        state.loading = false;
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== updateLesson ========
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        const updatedLesson = action.payload;
        const index = state.lessons.findIndex(l => l.id === updatedLesson.id);

        if (index !== -1) {
          state.lessons[index] = {
            id: updatedLesson.id,
            group_id: updatedLesson.group_id,
            direction_id: updatedLesson.direction_id,
            teacher_id: updatedLesson.teacher_id,
            start_time: updatedLesson.start_time,
            lesson_date: updatedLesson.lesson_date,
            duration_minutes: updatedLesson.duration_minutes,
            is_canceled: updatedLesson.is_canceled,
            school_id: updatedLesson.school_id,
            group_name: updatedLesson.Group?.name || '',
            dance_style: updatedLesson.DanceStyle?.name || '',
            teacher_name: updatedLesson.UserAccount?.UserProfile?.full_name || ''
          };
          state.lessons.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        }
        state.loading = false;
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== deleteLesson ========
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.lessons = state.lessons.filter(l => l.id !== deletedId);
        state.loading = false;
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== getLessonById ========
      .addCase(getLessonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLessonById.fulfilled, (state, action) => {
        const lesson = action.payload;
        state.currentLesson = {
          id: lesson.id,
          group_id: lesson.group_id,
          direction_id: lesson.direction_id,
          teacher_id: lesson.teacher_id,
          start_time: lesson.start_time,
          lesson_date: lesson.lesson_date,
          duration_minutes: lesson.duration_minutes,
          is_canceled: lesson.is_canceled,
          school_id: lesson.school_id,
          group_name: lesson.Group?.name || '',
          dance_style: lesson.DanceStyle?.name || '',
          teacher_name: lesson.UserAccount?.UserProfile?.full_name || '',
          teacher_phone: lesson.UserAccount?.UserProfile?.phone || ''
        };
        state.loading = false;
      })
      .addCase(getLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== generateLessons ========
      .addCase(generateLessons.pending, (state) => {
        state.generating = true;
        state.generateError = null;
      })
      .addCase(generateLessons.fulfilled, (state, action) => {
        const newLessons = action.payload;
        
        // Добавляем новые сгенерированные занятия к существующим
        state.lessons = [
          ...state.lessons,
          ...newLessons.map(lesson => ({
            id: lesson.id,
            group_id: lesson.group_id,
            direction_id: lesson.direction_id,
            teacher_id: lesson.teacher_id,
            start_time: lesson.start_time,
            duration_minutes: lesson.duration_minutes,
            is_canceled: lesson.is_canceled,
            school_id: lesson.school_id,
            group_name: lesson.Group?.name || '',
            dance_style: lesson.DanceStyle?.name || '',
            teacher_name: lesson.UserAccount?.UserProfile?.full_name || ''
          }))
        ].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        
        state.generating = false;
      })
      .addCase(generateLessons.rejected, (state, action) => {
        state.generating = false;
        state.generateError = action.payload;
      });
  }
});

export const {
  chooseLesson,
  clearCurrentLesson,
  clearGenerateState
} = lessonSlice.actions;

// Селекторы
export const selectLessons = (state) => state.lesson.lessons;
export const selectLessonsLoading = (state) => state.lesson.loading;
export const selectLessonsError = (state) => state.lesson.error;
export const selectCurrentLesson = (state) => state.lesson.currentLesson;
export const selectGeneratingLessons = (state) => state.lesson.generating;
export const selectGenerateError = (state) => state.lesson.generateError;

export default lessonSlice.reducer;