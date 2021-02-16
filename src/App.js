import './App.css';
import React, { Component } from 'react' 

import LoginForm from './LoginForm/LoginForm'
import LeaveForm from './LeaveForm/LeaveForm'
import RequestList from './RequestList/RequestList'
import { users } from './mockValues'

class App extends Component {

  state = {
    email_address: '',
    password: '',
    loginError: false,
    loggedIn: false,
    userDetails: [],
    first_name: '',
    last_name: '',
    leave_start: '',
    leave_end: '',
    leave_type: '',
    leave_reason: '',
    leaveRequestForm: null,
    activePage: 'button-left',
    formValid: false
  }

  // UPDATING STATE FOR AN INPUT FIELD IS CHANGED
  formInputHandler = (event) => {
    let updatedForm = { ...this.state }
    let inputName
    let inputValue
    if (!event.target.name) {
      inputName = event.target.classList[0]
      inputValue = event.target.id
      console.log(inputName, inputValue)
    } else {
      inputName = event.target.name
      inputValue = event.target.value
    }
    updatedForm[inputName] = inputValue
    this.setState(updatedForm)
  }

  // COMPARING THE INPUTTED EMAIL AND PASSWORD WITH THOSE IN MOCKVALUES.JS ON SUBMIT
  loginSubmitHandler = (event) => {
    event.preventDefault()
    const checkLogin = users.filter( item => {
      return (item['email_address'] === this.state.email_address.trim() && item['password'] === this.state.password)
    })
    this.setState({loggedIn: checkLogin.length > 0})
    this.setState({loginError: checkLogin.length === 0})
    this.setState({userDetails: checkLogin})
    console.log(checkLogin.length, checkLogin)
  }

  // UPDATING STATE FOR LEAVEREQUESTFORM WHEN SUBMITTED, ALSO CHECKS VALIDITY OF FORM
  leaveRequestSubmitHandler = (event) => {
    event.preventDefault()
    const leaveRequestForm = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      leave_start: this.state.leave_start,
      leave_end: this.state.leave_end,
      leave_type: this.state.leave_type,
      leave_reason: this.state.leave_reason,
      leave_taken: this.state.userDetails[0]['leave_taken']
    }
    this.setState({leaveRequestForm: leaveRequestForm})
    this.isFormValid(leaveRequestForm)
  }

  // VALIDITY CHECK FOR FORM
  isFormValid = (form) => {
    let formValidity = true
    if (form === null) {
      formValidity = false
    } else {
      for (let item in form) {
        formValidity = (form[item] !== "" && formValidity)
      }
    }
    this.setState({formValid: formValidity})
    if (formValidity) {
      this.setState({activePage: 'button-right'})
    }
  }

  // ENABLE THE BUTTONGROUP TO TOGGLE BETWEEN THE TWO PAGES
  buttonToggle = (event) => {
    // CHANGING THE STYLING OF THE BUTTONS
    const buttonName = event.target.value
    let otherButton
    if (buttonName === 'button-left') {
      otherButton = 'button-right'
    } else {
      otherButton = 'button-left'
    }
    event.target.classList.remove('primary-button')
    event.target.classList.add('default-button')
    document.querySelector(`.${otherButton}`).classList.remove('default-button')
    document.querySelector(`.${otherButton}`).classList.add('primary-button')
    // CHANGING PAGE VIA STATE
    this.setState({activePage: buttonName})
  }

  render () {
    return (
      <div className='App'>
        <div className='body'>
          {!this.state.loggedIn ?
            <LoginForm 
              loginError={this.state.loginError}
              formInputHandler={this.formInputHandler}
              loginSubmitHandler={this.loginSubmitHandler} />
            : 
            <div>
              <div className='button-group'>
                <button
                  className='default-button button-left' 
                  value='button-left' type='button' 
                  onClick={this.buttonToggle}>APPLY FOR LEAVE</button>
                <button 
                  className='primary-button button-right' 
                  value='button-right' type='button'
                  onClick={this.buttonToggle}>LEAVE REQUESTS</button>
              </div>
              {this.state.activePage === 'button-left' 
                ? <LeaveForm 
                  leaveDays={this.state.userDetails[0]['leave_taken']}
                  formInputHandler={this.formInputHandler}
                  leaveRequestSubmitHandler={this.leaveRequestSubmitHandler}
                  formValid={this.state.formValid} />
                : <RequestList
                  leaveRequestForm={this.state.leaveRequestForm}
                  formValid={this.state.formValid} />
              }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App
