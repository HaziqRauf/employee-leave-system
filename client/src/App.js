import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Register, Landing, Error, ProtectedRoute} from './pages';
import {Role} from './context/roles.ts'
import {
  AllLeaves,
  Profile,
  SharedLayout,
  Stats,
  ApplyLeave
} from './pages/dashboard';

function App() {
  return(
    <BrowserRouter>
     <Routes>
      <Route path='/'
        element={
         <ProtectedRoute roles={[Role.Admin, Role.User]}>
          <SharedLayout />
         </ProtectedRoute>
        }>
        <Route index element={<Stats />} />
        <Route path='all-leaves'
         element={
         <ProtectedRoute roles={[Role.Admin]}>
          <AllLeaves />
         </ProtectedRoute>
         } />
        <Route path='apply-leave'
         element={
          <ApplyLeave />
         } />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Error />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App;
