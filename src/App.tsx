import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { AvatarSelection } from './pages/AvatarSelection';
import { Dashboard } from './pages/Dashboard';
import { Lesson } from './pages/Lesson';
import { LessonComplete } from './pages/LessonComplete';
import { Settings } from './pages/Settings';
import { useGameStore } from './store/useGameStore';

function App() {
  const profile = useGameStore((state) => state.profile);
  const hasProfile = profile.name && profile.avatarId;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/avatar-selection" element={<AvatarSelection />} />
        <Route
          path="/dashboard"
          element={hasProfile ? <Dashboard /> : <Navigate to="/avatar-selection" />}
        />
        <Route
          path="/lesson/:lessonId"
          element={hasProfile ? <Lesson /> : <Navigate to="/avatar-selection" />}
        />
        <Route
          path="/lesson-complete"
          element={hasProfile ? <LessonComplete /> : <Navigate to="/avatar-selection" />}
        />
        <Route
          path="/settings"
          element={hasProfile ? <Settings /> : <Navigate to="/avatar-selection" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
