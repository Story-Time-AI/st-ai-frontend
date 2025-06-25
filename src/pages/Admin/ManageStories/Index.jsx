import React from 'react'
import Header from '../../../components/Header'
import AddTemplateForm from '../../../components/Admin/AddTemplate/Index'

export default function Index() {
  return (
    <div data-theme='light'>
      <Header title='Manage Stories' />
      <AddTemplateForm />
    </div>
  )
}
