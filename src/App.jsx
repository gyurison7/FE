import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import Layout from './layout';
import Router from './router/Router.jsx';
import LoadingSpinner from './components/common/loading/LoadingSpinner.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Layout>
          <LoadingSpinner />
          <Router />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}

export default App;
