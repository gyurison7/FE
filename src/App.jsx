import Layout from './layout';
import Router from './router/Router.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
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
