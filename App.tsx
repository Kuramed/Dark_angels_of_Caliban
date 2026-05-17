import { BrowserRouter } from 'react-router-dom';
import { Nav } from './components/Nav';
import { AppRouters } from './routers/app.routers';

function App() {
  return (
    <BrowserRouter>
      {/* O Nav aparece fixo no topo de todas as páginas */}
      <Nav />
      
      <main className="container-fluid min-vh-100 bg-light p-0">
        <div className="py-4">
          <AppRouters />
        </div>
      </main>

      <footer className="bg-white border-top py-3 text-center text-muted">
        <small>Plataforma de Cursos &copy; {new Date().getFullYear()}</small>
      </footer>
    </BrowserRouter>
  );
}

export default App;