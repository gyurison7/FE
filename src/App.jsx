import Layout from './layout';
import Router from './router/Router.jsx';
import './index.css';
function App() {
  return (
    <div className='App'>
      <Layout>
        <Router />
      </Layout>
    </div>
  );
}

export default App;
