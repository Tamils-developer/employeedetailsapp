import React from 'react'
import './Toggle.css'

const ToggleButton = (props:any) => {
  return (
    <div className="container">
  <div className="switches-container">
    <input type="radio" id="switchApply" name="switchPlan" value="Apply" onChange={props.applyOnChng} checked={props.applyChecked} />
    <input type="radio" id="switchPast" name="switchPlan" value="Past" onChange={props.pastOnChng} checked={props.pastChecked}/>
    <label htmlFor="switchApply">{props.apply}</label>
    <label htmlFor="switchPast">{props.past}</label>
    <div className="switch-wrapper">
      <div className="switch">
        <div>{props.apply}</div>
        <div>{props.past}</div>
      </div>
    </div>
  </div>
</div> 
  )
}

export default ToggleButton