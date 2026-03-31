import FlowBackground from '@/src/components/FlowBackground';
import PageTransition from '@/src/components/PageTransition';
import ThemedCursors from '@/src/components/ThemedCursors';
import { AppRoutes } from '@/src/constants/routes';
import Home from '@/src/views/Home';
import NotFound from '@/src/views/NotFound';
import Resume from '@/src/views/Resume';
import { Route, Routes, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  return (
    <PageTransition>
      <div className="relative min-h-screen">
        <FlowBackground />
        <div className="relative z-10">
          <ThemedCursors />
          <Routes location={location} key={location.pathname}>
            <Route path={AppRoutes.Home} element={<Home />} />
            <Route path={AppRoutes.Resume} element={<Resume />} />
            <Route path={AppRoutes.NotFound} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </PageTransition>
  );
};

export default App;
