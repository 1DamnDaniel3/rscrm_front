import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, ThemeProvider } from './context'
import { AuthenticationPage } from '../pages'
import style from './styles.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>

          <Routes>
            <Route path='/' element={<div>HELLO YOPTA</div>} />

            <Route path='/registration' element={<AuthenticationPage />} />

          </Routes>

        </ThemeProvider>

      </AuthProvider>



    </div>
  );
}

export default App;
