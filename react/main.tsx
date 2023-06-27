import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import jsonData from "./data.json";
import ProfessionalList from './src/components/ProfessionalList';

ReactDOM.render(<ProfessionalList />, document.getElementById('root'));