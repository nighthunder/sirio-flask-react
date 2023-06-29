import * as React from 'react';
import { useState, useEffect } from 'react';
import ProfessionalList from './src/components/ProfessionalList';
import ResponsiveHeader from './src/components/ResponsiveHeader';
import AddProfessionalForm from './src/components/AddProfessionalForm';
import ResponsiveFooter from './src/components/ResponsiveFooter';
function App() {
return (
    <div>
        <ResponsiveHeader></ResponsiveHeader>
        <AddProfessionalForm></AddProfessionalForm>
        <ResponsiveFooter></ResponsiveFooter>
    </div>

);
}
export default App;