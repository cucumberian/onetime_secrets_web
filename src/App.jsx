import {createBrowserRouter} from 'react-router-dom';
import {RouterProvider} from 'react-router-dom';

import Generate from './pages/Generate/Generate';
import Secret from './pages/Secret/Secret';

import './App.css';
import GenerateSuccess from './pages/GenerateSuccess/GenerateSuccess';


import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    "path": "/",
    "element": <Generate />,
  },
  {
    "path": "/:secret_key",
    "element": <Secret />,
  },
  {
    path: "/success",
    element: <GenerateSuccess />,
  },
]);


function App() {

  return <ChakraProvider>
    <RouterProvider router={router}/>
  </ChakraProvider>
}

export default App
