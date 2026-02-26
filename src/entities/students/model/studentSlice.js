import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// --- THUNKS ---

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.student.getAllWhere(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const addStudent = createAsyncThunk(
    'students/addStudent',
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.student.addStudentWithGroup(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await APIs.student.updateStudent(id, data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (id, { rejectWithValue }) => {
        try {
            const response = await APIs.student.deleteStudent(id);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

// ----================================ Filtered Students ================================----

// Сгруппированные ученики
export const groupedStudents = createAsyncThunk(
    'students/groupedStudents',
    async (data, {rejectWithValue}) =>{
        try{
            const responce = await APIs.student.getGrouped(data);
            return responce.data;
        } catch(error){
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
        
    }
)



// ---------------------------------------------------- SLICE ----------------------------------------------------

const initialState = {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ======== fetchStudents ========
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                
                const studentsPayload = action.payload.data;

                const byIds = {};
                const AllIds = [];

                studentsPayload.forEach(student => {
                    byIds[student.id] = student
                    AllIds.push(student.id)
                });

                AllIds.sort((a, b) => a - b);

                state.byId = byIds;
                state.allIds = AllIds;

                state.loading = false;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ======== addStudent ========
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                const newStudent = action.payload;
                state.byId[newStudent.id] = newStudent

                if (!state.allIds.includes(newStudent.id)){
                    state.allIds.push(newStudent.id)
                }
                state.allIds.sort((a, b) => b - a)  

                state.loading = false;
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ======== updateStudent ========
            .addCase(updateStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                const {id, ...changes} = action.payload;

                if(state.byId[id]){
                    state.byId[id] = {
                        ...state.byId[id],
                        ...changes
                    };
                }
                state.loading = false;
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ======== deleteStudent ========
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                const deletedID = action.payload.id;
                if(!deletedID) return;

                delete state.byId[deletedID];
                if (state.allIds){
                    state.allIds = state.allIds.filter(id => id !== deletedID);
                }

                state.loading = false;
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ---================== Filtered ==================---
            
             .addCase(groupedStudents.pending, (state) => {
                 state.loading = true;
                 state.error = null;
             })
             .addCase(groupedStudents.fulfilled, (state, action) => {
                 
                 const studArray = action.payload?.data || [];

                 const ById = {};
                const AllIds = [];

                 studArray.forEach(student => {
                    ById[student.id] = student
                    AllIds.push(student.id)
                  });

                   AllIds.sort((a, b) => b - a);

                   state.byId = ById;
                   state.allIds = AllIds;

                   state.loading = false;
               })
               .addCase(groupedStudents.rejected, (state, action) => {
                   state.loading = false;
                   state.error = action.payload;
               });
               
    }
});

// --- SELECTORS ---
export const selectStudents = createSelector(
    [
        (state) => state.students.allIds,
        (state) => state.students.byId,
    ],
    (ids, entities) => ids.map(id => entities[id])
);
export const selectLoadStudents = (state) => state.students.loading;
export const selectErrorStudents = (state) => state.students.error;

export default studentSlice.reducer;
