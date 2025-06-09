import { Route, Routes } from 'react-router-dom';
import { AuthProvider, ThemeProvider } from './context'
import { ProtectedRoute } from './hoc/ProtectedRoute';
import { AuthenticationPage, Leads, Profile, AdminSchools, StudentsPage } from '../pages'
import style from './styles.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>

          <Routes>
            <Route path='/registration' element={<AuthenticationPage />} />


            <Route path='/profile' element={<ProtectedRoute roles={['admin', 'owner', 'manager',
              'receptionist', 'teacher', 'accountant']}><Profile /></ProtectedRoute>} />
              
            <Route path='/leads' element={<ProtectedRoute roles={['manager', 'owner']}><Leads /></ProtectedRoute>} />
            <Route path='/students' element={<ProtectedRoute roles={['manager', 'owner']}><StudentsPage /></ProtectedRoute>} />

            {/* =================== admin =================== */}

            <Route path='/admin/schools' element={<ProtectedRoute roles={['admin']}><AdminSchools /></ProtectedRoute>} />


          </Routes>

        </ThemeProvider>

      </AuthProvider>



    </div>
  );
}

export default App;
