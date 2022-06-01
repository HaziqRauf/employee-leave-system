import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Register, Landing, Error, ProtectedRoute} from './pages';
import {
  AllJobs,
  AllLeaves,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  ApplyLeave
} from './pages/dashboard';

function App() {
  return(
    <BrowserRouter>
     <Routes>
      <Route path='/'
        element={
         <ProtectedRoute>
          <SharedLayout />
         </ProtectedRoute>
        }>
        <Route index element={<Stats />} />
        <Route path='all-jobs' element={<AllJobs />} />
        <Route path='all-leaves' element={<AllLeaves />} />
        <Route path='add-job' element={<AddJob />} />
        <Route path='apply-leave' element={<ApplyLeave />} />
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
