import React from 'react';
// import Home from './pages/home/index';

import AppRoutes from './routes/index'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;