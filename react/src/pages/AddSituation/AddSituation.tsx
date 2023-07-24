import * as React from 'react';
import ResponsiveHeader from '../../components/ResponsiveHeader/ResponsiveHeader';
import AddSituationForm from '../../components/AddSituationForm/AddSituationForm';
import ResponsiveFooter from '../../components/ResponsiveFooter/ResponsiveFooter';
import './styles.css';

function AddUser() {
return (
    <div>
        <ResponsiveHeader></ResponsiveHeader>
        <h2>Status</h2>
        <AddSituationForm></AddSituationForm>
        <ResponsiveFooter></ResponsiveFooter>
    </div>

);
}
export default AddUser;