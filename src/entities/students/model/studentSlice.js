import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// --- THUNKS ---

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async (school_id, { rejectWithValue }) => {
        try {
            const response = await APIs.student.getStudentsWhere({ school_id });
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
            const response = await APIs.student.addStudent(data);
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

// --- SLICE ---

const initialState = {
    students: [],
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
                const sortedStudents = action.payload.slice().sort((a, b) => {
                    const idA = typeof a.id === 'string' ? Number(a.id) : a.id;
                    const idB = typeof b.id === 'string' ? Number(b.id) : b.id;
                    return idB - idA;
                });

                state.students = sortedStudents.map(student => ({
                    id: student.id,
                    name: student.name,
                    birthdate: student.birthdate,
                    age: student.birthdate,
                    skill_level: student.skill_level,
                    contact: student.contact,
                    created_at: student.created_at,
                    groups: (student.Groups || []).map(group => ({ id: group.id })),
                    subscriptions: (student.Subscriptions || []).map(sub => ({
                        id: sub.id,
                        sub_name: sub.name,
                        issued_at: sub.StudentSubscription?.issued_at,
                        expires_at: sub.StudentSubscription?.expires_at,
                        remaining_visits: sub.StudentSubscription?.remaining_visits
                    })),
                    clients: (student.Clients || []).map(client => ({
                        id: client.id,
                        client_name: client.name,
                        phone: client.phone,
                        contact: client.contact,
                        is_payer: client.StudentClient?.is_payer,
                        relation: client.StudentClient?.relation
                    }))
                }));

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
                const student = action.payload;
                const newId = typeof student.id === 'string' ? Number(student.id) : student.id;

                state.students.push({
                    id: newId,
                    name: student.name,
                    birthdate: student.birthdate,
                    age: student.birthdate,
                    skill_level: student.skill_level,
                    contact: student.contact,
                    created_at: student.created_at,
                    groups: (student.Groups || []).map(group => ({ id: group.id })),
                    subscriptions: (student.Subscriptions || []).map(sub => ({
                        id: sub.id,
                        sub_name: sub.name,
                        issued_at: sub.StudentSubscription?.issued_at,
                        expires_at: sub.StudentSubscription?.expires_at,
                        remaining_visits: sub.StudentSubscription?.remaining_visits
                    })),
                    clients: (student.Clients || []).map(client => ({
                        id: client.id,
                        client_name: client.name,
                        phone: client.phone,
                        contact: client.contact,
                        is_payer: client.StudentClient?.is_payer,
                        relation: client.StudentClient?.relation
                    }))
                });

                state.students.sort((a, b) => b.id - a.id);
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
                const updated = action.payload;
                const updatedId = typeof updated.id === 'string' ? Number(updated.id) : updated.id;

                const idx = state.students.findIndex(s => s.id === updatedId);
                const studentData = {
                    id: updatedId,
                    name: updated.name,
                    birthdate: updated.birthdate,
                    created_at: updated.created_at,
                    skill_level: updated.skill_level,
                    contact: updated.contact,
                    groups: (updated.Groups || []).map(group => ({ id: group.id })),
                    subscriptions: (updated.Subscriptions || []).map(sub => ({
                        id: sub.id,
                        sub_name: sub.name,
                        issued_at: sub.StudentSubscription?.issued_at,
                        expires_at: sub.StudentSubscription?.expires_at,
                        remaining_visits: sub.StudentSubscription?.remaining_visits
                    })),
                    clients: (updated.Clients || []).map(client => ({
                        id: client.id,
                        client_name: client.name,
                        phone: client.phone,
                        contact: client.contact,
                        is_payer: client.StudentClient?.is_payer,
                        relation: client.StudentClient?.relation
                    }))
                };

                if (idx < 0) {
                    state.students.push(studentData);
                } else {
                    state.students[idx] = studentData;
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
                const deletedId = typeof action.payload === 'object' && 'id' in action.payload
                    ? Number(action.payload.id)
                    : Number(action.payload);

                state.students = state.students.filter(student => student.id !== deletedId);
                state.loading = false;
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// --- SELECTORS ---
export const selectStudents = (state) => state.students.students;
export const selectLoadStudents = (state) => state.students.loading;
export const selectErrorStudents = (state) => state.students.error;

export default studentSlice.reducer;
