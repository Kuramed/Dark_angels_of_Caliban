import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Courses } from '../pages/Courses';
import { CourseDetails } from '../pages/CourseDetails';
import { ProgressAndCertificates } from '../pages/ProgressAndCertificates';
import { Checkout } from '../pages/Checkout';
import { CourseManagement } from '../pages/CourseManagement'; 
import { ModuleLessonManagement } from '../pages/ModuleLessonManagement';
import { LessonViewer } from '../pages/LessonViewer';
import { TrilhasManagement } from '../pages/TrilhasManagement';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/progress" element={<ProgressAndCertificates />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/courses" element={<CourseManagement />} /> {/* Nova Rota */}
          <Route path="/admin/modules-lessons" element={<ModuleLessonManagement />} />
          <Route path="/lessons/:id" element={<LessonViewer />} />
          <Route path="/admin/trilhas" element={<TrilhasManagement />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}