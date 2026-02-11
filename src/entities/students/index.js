export { studentApi } from './api/studentApi'
export {
    default as studentReducer, fetchStudents, addStudent, updateStudent, deleteStudent, groupedStudents,
    selectStudents, selectLoadStudents, selectErrorStudents
} from './model/studentSlice'