import * as React from 'react';
import ResponsiveHeader from '../../components/ResponsiveHeader/ResponsiveHeader';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import ResponsiveFooter from '../../components/ResponsiveFooter/ResponsiveFooter';
import './styles.css';

function AddUser() {
return (
    <div>
        <ResponsiveHeader></ResponsiveHeader>
        <h2>Users</h2>
        <AddUserForm></AddUserForm>
        <ResponsiveFooter></ResponsiveFooter>
    </div>

);
}
export default AddUser;