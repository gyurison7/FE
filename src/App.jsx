import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastProvider } from './hooks/useToast.jsx';
import './index.css';
import Layout from './layout';
import Router from './router/Router.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
      <div className='App'>
        <Layout>
          <Router />
        </Layout>
      </div>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
