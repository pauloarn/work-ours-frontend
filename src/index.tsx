import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Slide } from 'react-toastify';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <ToastContainer transition={Slide} hideProgressBar={true} limit={1} autoClose={2000} position='top-right' />
    </React.StrictMode>,
    document.getElementById('root')
);
