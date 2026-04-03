import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './components/root/root';
import Home from './components/home/home';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<Home/>}/>
    </Route>
  )
);

function App() {
  

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;