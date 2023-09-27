import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import Layout from './layout';
import Router from './router/Router.jsx';
import { useEffect } from 'react';
import { useSocketManager } from './hooks/useSocketManager.jsx';

const queryClient = new QueryClient();

function App() {
  const { initializeSocket } = useSocketManager();

  useEffect(() => {
    const socket = initializeSocket();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Layout>
          <Router />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}

export default App;
