import React from 'react'
import Header from '../../../components/Header'
import ManageUsersTable from '../../../components/Admin/ManageUsers/ManageUsersTable'

export default function Index() {
  return (
    <div>
        <Header title="Manage Users" />
        <ManageUsersTable />
    </div>
  )
}
