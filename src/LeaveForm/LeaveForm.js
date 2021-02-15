import React from 'react'

const leaveForm = (props) => {

  const selector = () => {
    document.querySelector('.custom-select').classList.toggle('open');
    document.querySelector('.custom-select-trigger').classList.toggle('open');
    for (const option of document.querySelectorAll(".custom-option")) {
      option.addEventListener('click', function() {
          if (!this.classList.contains('selected')) {
              this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
              this.classList.add('selected');
              this.closest('.custom-select').querySelector('.custom-select-trigger span').textContent = this.textContent;
          }
      })
    }
  }

  let errorMessage

  const formChecker = () => {
    const inputs = document.querySelectorAll('.form-input')
    const labels = document.querySelectorAll('.form-label')
  
    if (!props.formValid) {
      for (let input of inputs) {
        input.classList.add('form-invalid')
      }
      for (let label of labels) {
        label.classList.add('form-invalid-label')
      }
      return errorMessage = <div className='error-message'>Form is invalid</div>
    } else {
      for (let input of inputs) {
        input.classList.remove('form-invalid')
      }
      for (let label of labels) {
        label.classList.remove('form-invalid-label')
      }
    }
  }

  return (
    <div className='form-container'>
      <p className='heading-1'>Apply for Leave</p>
      <form onSubmit={props.leaveRequestSubmitHandler} noValidate>
        {errorMessage}
        <div className='input-container'>
          <label className='form-label' htmlFor='first_name'>First Name</label>
          <input 
            className='form-input'
            id='first_name' name='first_name' type='text' required 
            onChange={props.formInputHandler} />
        </div>
        <div className='input-container'>
          <label className='form-label' htmlFor='last_name'>Last Name</label>
          <input 
            className='form-input'
            id='last_name' name='last_name' type='text' required 
            onChange={props.formInputHandler} />
        </div>
        <div className='date-container'>
          <div className='input-container ml-0'>
            <label className='form-label' htmlFor='leave_start'>Leave Start Date</label>
            <input 
              className='form-input form-date'
              id='leave_start' name='leave_start' type='date' required 
              onChange={props.formInputHandler} />
          </div>
          <div className='input-container mr-0'>
            <label className='form-label' htmlFor='leave_end'>Leave End Date</label>
            <input 
              className='form-input form-date'
              id='leave_end' name='leave_end' type='date' required 
              onChange={props.formInputHandler} />
          </div>
        </div>
        <div className='input-container'>
          <label className='form-label' htmlFor='leave_type'>Type of Leave</label>
          <div className="custom-select-wrapper" onClick={() => selector()}>
              <div className="custom-select">
                  <div className="custom-select-trigger">
                      <span>Select...</span>
                      <div className="arrow"></div>
                  </div>
                  <div className="custom-options">
                      <div 
                        className="leave_type custom-option selected" 
                        data-value="annual" 
                        name='annual' 
                        id='annual' 
                        value='annual' 
                        onClick={props.formInputHandler}>Annual</div>
                      <div 
                        className="leave_type custom-option" 
                        data-value="family" 
                        name='family' 
                        id='family'
                        value='family'
                        onClick={props.formInputHandler}>Family</div>
                      <div 
                        className="leave_type custom-option" 
                        data-value="maternity" 
                        id='maternity'  
                        onClick={props.formInputHandler}>Maternity</div>
                      <div 
                        className="leave_type custom-option" 
                        data-value="study" 
                        id='study'
                        onClick={props.formInputHandler}>Study</div>
                  </div>
              </div>
          </div>          
        </div>
        <div className='input-container '>
          <label className='form-label' htmlFor='leave_reason'>Reason for Leave</label>
          <textarea 
            className='form-input text-area-input'
            id='leave_reason' name='leave_reason' rows='4' required 
            onChange={props.formInputHandler} />
        </div>
        <div className='day-container'>
          <label className='form-label'>Number of leave days taken:</label>
          <p className='days-left'>{props.leaveDays}</p>
        </div>
        <button className='primary-button' type='submit' onClick={() => formChecker()}>Submit</button>
      </form>
    </div>
  )
}

export default leaveForm