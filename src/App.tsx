import { SessionProvider } from './context/SessionContext';
import { AppRoutes } from './routes/routes';

export default function App() {
  return (
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  );
}
