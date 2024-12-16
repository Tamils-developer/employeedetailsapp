import React, { useState } from 'react'

const CheckboxComp = (props: any) => {
    return (
        <input type="checkbox" name={props.name} value={props.value} onChange={props.chngFn} />
    )
}

export default CheckboxComp

