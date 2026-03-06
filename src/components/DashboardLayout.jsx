import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ProtectedRoute } from './ProtectedRoute';

export default function DashboardLayout() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-transparent flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 pb-24 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
