import React from 'react'

import { existingRequests } from '../mockValues'

const requestList = (props) => {

  const list = existingRequests.map( (item, i) => {
    return (
      <div className='row table-row' key={i}>
        <div className='col-2 table-value'>{item['first_name']} {item['last_name']}</div>
        <div className='col-2 table-value'>{item['leave_start']}</div>
        <div className='col-2 table-value'>{item['leave_end']}</div>
        <div className='col-2 table-value'>{item['leave_type']}</div>
        <div className='col-3 table-value'>{item['leave_reason']}</div>
        <div className='col-1 table-value text-center'>{item['leave_taken']}</div>
      </div>
    )
  })

  let newRequests

  if (props.leaveRequestForm !== null) {
    newRequests = (
      <div className='row table-row'>
        <div className='col-2 table-value'>{props.leaveRequestForm.first_name} {props.leaveRequestForm.last_name}</div>
        <div className='col-2 table-value'>{props.leaveRequestForm.leave_start}</div>
        <div className='col-2 table-value'>{props.leaveRequestForm.leave_end}</div>
        <div className='col-2 table-value'>{props.leaveRequestForm.leave_type}</div>
        <div className='col-3 table-value'>{props.leaveRequestForm.leave_reason}</div>
        <div className='col-1 table-value text-center'>{props.leaveRequestForm.leave_taken}</div>
      </div>
    )
  }

  return (
    <div className='container-sm request-container'>
      <p className='heading-1'>Leave Requests</p>
      <div className='request-table'>
        <div className='row table-headings'>
          <div className='col-2 table-heading'>Name</div>
          <div className='col-2 table-heading'>Start Date</div>
          <div className='col-2 table-heading'>End Date</div>
          <div className='col-2 table-heading'>Type of Leave</div>
          <div className='col-3 table-heading'>Reason for Leave</div>
          <div className='col-1 table-heading text-center'>Days taken</div>
        </div>
        <div>
          {list}
          {newRequests}
        </div>
      </div>
    </div>
  )
}

export default requestList