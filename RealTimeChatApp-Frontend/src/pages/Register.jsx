import React from 'react'
import styled from 'styled-components'

const FormContainer = styled``

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert('form')
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src="" alt="" />
                        <h1>Chatter</h1>
                    </div>

                    <input type="text" name="username" placeholder='Username' />
                    <input type="text" name="email" placeholder='Email' />
                    <input type="password" name="password" placeholder='Password' />
                    <input type="text" name="confirm-password" placeholder='Confirm Password' />


                </form>

            </FormContainer>
        </>
    )
}

export default Register
