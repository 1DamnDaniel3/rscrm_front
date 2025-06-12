import { Route, Routes } from 'react-router-dom';
import { AuthProvider, ThemeProvider } from './context'
import { ProtectedRoute } from './hoc/ProtectedRoute';
import {
  AuthenticationPage, Leads, Profile,
  AdminSchools, StudentsPage, Clients,
  Shedule, Finances, Report
} from '../pages'
import style from './styles.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>

          <Routes>
            {/* roles = 'owner' | 'manager' | 'admin' | 'receptionist'| 'teacher' | 'accountant'  */}
            <Route path='/registration' element={<AuthenticationPage />} />


            <Route path='/profile' element={<ProtectedRoute roles={['admin', 'owner', 'manager',
              'receptionist', 'teacher', 'accountant']}><Profile /></ProtectedRoute>} />

            <Route path='/leads' element={<ProtectedRoute roles={['manager', 'owner']}><Leads /></ProtectedRoute>} />
            <Route path='/students' element={<ProtectedRoute roles={['manager', 'owner']}><StudentsPage /></ProtectedRoute>} />
            <Route path='/clients' element={<ProtectedRoute roles={['manager', 'owner']}><Clients /></ProtectedRoute>} />
            <Route path='/schedule' element={<ProtectedRoute roles={['receptionist', 'teacher', 'owner']}><Shedule /></ProtectedRoute>} />
            <Route path='/finances' element={<ProtectedRoute roles={['accountant', 'owner']}><Finances /></ProtectedRoute>} />
            <Route path='/reports' element={<ProtectedRoute roles={['accountant', 'owner']}><Report /></ProtectedRoute>} />

            {/* =================== admin =================== */}

            <Route path='/admin/schools' element={<ProtectedRoute roles={['admin']}><AdminSchools /></ProtectedRoute>} />


          </Routes>

        </ThemeProvider>

      </AuthProvider>



    </div>
  );
}

export default App;
