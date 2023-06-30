import * as React from 'react';
import ResponsiveHeader from '../ResponsiveHeader/ResponsiveHeader';
import AddProfessionalTypeForm from '../AddProfessionalTypeForm/AddProfessionalTypeForm';
import ResponsiveFooter from '../ResponsiveFooter/ResponsiveFooter';
import './styles.css';
function AddProfessionalType() {
return (
    <div>
        <ResponsiveHeader></ResponsiveHeader>
        <h2>Tipos de profissionais</h2>
        <AddProfessionalTypeForm></AddProfessionalTypeForm>
        <ResponsiveFooter></ResponsiveFooter>
    </div>

);
}
export default AddProfessionalType;