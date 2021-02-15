import React from 'react'

const loginForm = (props) => {
  let errorMessage

  const inputs = document.querySelectorAll('.login-input')
  const labels = document.querySelectorAll('.login-label')

  if (props.loginError) {
    errorMessage = <div className='error-message'>Invalid email address or password</div>
    for (let input of inputs) {
      input.classList.add('form-invalid')
    }
    for (let label of labels) {
      label.classList.add('form-invalid-label')
    }
  } else {
    for (let input of inputs) {
      input.classList.remove('form-invalid')
    }
    for (let label of labels) {
      label.classList.remove('form-invalid-label')
    }
  }

  return (
    <div className='container form-container'>
      <p className='heading-1'>Login</p>
      <form onSubmit={props.loginSubmitHandler} noValidate>
        {errorMessage}
        <div className='input-container'>
          <label className='form-label login-label' htmlFor='email_address'>Email Address</label>
          <input className='login-input form-input' id='email_address' name='email_address' type='email' onChange={props.formInputHandler} />
        </div>
        <div className='input-container'>
          <label className='form-label login-label' htmlFor='password'>Password</label>
          <input className='login-input form-input' id='password' name='password' type='password' onChange={props.formInputHandler} />
        </div>
        <button className='primary-button mt-2' type='submit'>LOGIN</button>
      </form>
    </div>
  )
}

export default loginForm