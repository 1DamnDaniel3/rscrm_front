import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// Все клиенты ученика
export const studentClients = createAsyncThunk(
    'studentClients/studentClients',
    async (student_id, {rejectWithValue}) =>{
        try{
            const responce = await APIs.student.getStudenClietns(student_id);
            return responce.data;
        } catch(error){
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
        
    }
)

export const addRelation = createAsyncThunk(
    'studentClients/addRelation',
    async (data, {rejectWithValue}) =>{
        try{
            const responce = await APIs.student_clients.createRelation(data);
            return responce.data;
        } catch(error){
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
        
    }
)

export const deleteRelation = createAsyncThunk(
    'studentClients/deleteRelation',
    async ({relation_id, student_id}, {rejectWithValue}) =>{
        try{
            await APIs.student_clients.delete(relation_id);
            return {relation_id, student_id};
        } catch(error){
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
        
    }
)

export const ChangeRelation = createAsyncThunk(
    'studentClients/ChangeRelation',
    async ({id, data}, {rejectWithValue}) =>{
        try{
            const responce = await APIs.student_clients.update(id, data);
            return responce.data;
        } catch(error){
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
        
    }
)


// --------------------======================= SLICE =======================--------------------

const initialState = {
    byId: {},
    allIds: [],
    idsByStudent: {}, // studId: [cliID, cliID, cliID]
    loading: false,
    error: null,
};

const StudentClientSlice = createSlice({
    name: "studentClients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Get Student Clients
            // imported studentsThunk "studentClients"

        .addCase(studentClients.pending, (state) => {
                state.loading = true;
                state.error = null;
        })
        .addCase(studentClients.fulfilled, (state, action) => {
            const studentId = action.meta.arg; 
            const businessObj = action.payload?.data || [];

            const ids = [];
            businessObj.forEach(bo => {
                state.byId[bo.relation_id] = bo;

                if (!state.allIds.includes(bo.relation_id)) {
                    state.allIds.push(bo.relation_id);
                }

                ids.push(bo.relation_id);
            });
            state.idsByStudent[studentId] = ids;
            
            state.loading = false;
        })
        .addCase(studentClients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // ============ CREATE AND GET BO

        .addCase(addRelation.pending, (state) => {
                state.loading = true;
                state.error = null;
        })
        .addCase(addRelation.fulfilled, (state, action) => {
            const bo = action.payload || {};
            const studentId = action.meta.arg.student_id;

            state.byId[bo.relation_id] = bo;

            if (!state.allIds.includes(bo.relation_id)) {
                state.allIds.push(bo.relation_id);
            }

            if (!state.idsByStudent[studentId]) {
                state.idsByStudent[studentId] = [];
            }

            if (!state.idsByStudent[studentId].includes(bo.relation_id)) {
                state.idsByStudent[studentId].push(bo.relation_id);
            };
            
            state.loading = false;
        })
        .addCase(addRelation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // ============ DELETE RELATION
        .addCase(deleteRelation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteRelation.fulfilled, (state, action) => {
            const { relation_id, student_id } = action.payload;

            // Удаляем из byId
            delete state.byId[relation_id];

            // Обновляем allIds
            state.allIds = state.allIds.filter(rel_id => rel_id !== relation_id);

            // Удаляем из idsByStudent
            if (state.idsByStudent[student_id]) {
                state.idsByStudent[student_id] = state.idsByStudent[student_id].filter(clientId => clientId !== relation_id);
            }

                    state.loading = false;
                    state.error = null;
                })
        .addCase(deleteRelation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Change Relation

        .addCase(ChangeRelation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(ChangeRelation.fulfilled, (state, action) => {
            
            const {id, ...changes} = action.payload;

            if(state.byId[id]){
                state.byId[id] = {
                    ...state.byId[id],
                    ...changes
                };
            }                
            state.loading = false;
            state.error = null;
        })
        .addCase(ChangeRelation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default StudentClientSlice.reducer;

export const selectStudentClientsByStudent = createSelector(
    [
        (state) => state.studClients.idsByStudent, 
        (state) => state.studClients.byId,        
        (_, studentId) => studentId                  
    ],
    (idsByStudent, byId, studentId) => {
        const ids = idsByStudent[studentId] || [];
        return ids.map(id => byId[id]);
    }
);

export const selectAllStudentClients = createSelector(
    (state) => state.studClient.allIds,   
    (state) => state.studClient.byId,     
    (allIds, byId) => allIds.map(id => byId[id]) 
);

// Селектор для получения состояния загрузки
export const selectLoadingState = (state) => state.studClients.loading;

// Селектор для получения ошибки
export const selectErrorState = (state) => state.studClients.error;