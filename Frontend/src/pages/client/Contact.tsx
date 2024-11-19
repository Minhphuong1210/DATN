import React, { useState } from 'react'
import { UseAuth } from '../../hook/Auth'
import Header from '../../components/client/Home/Header/Header'
import ContactsForm from '../../components/Form/ContactsForm'

type Props = {}

const Contact = (props: Props) => {
    const {Contacts} = UseAuth()
  return (
    <>
        <div >
            <ContactsForm onSubmit={Contacts}/>
        </div>
    </>
  )
}

export default Contact