import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

//全局监测store状态的改变，使全局页面重新渲染(调render)
store.subscribe(() => {
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
