import React from 'react';

// components
import Main from './Main';
import Footer from './Footer';

import '../styles/main.scss';

function App () {
  return (
    <>
      <header>
        <h1>Tweet Bot Wall</h1>
      </header>
      <Main />
      <Footer />
    </>
  );
}

export default App;
