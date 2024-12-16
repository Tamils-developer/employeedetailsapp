import React, { useState } from 'react'
import { Container, Form, Segment } from 'semantic-ui-react'
import LabelComp from './LabelComp'

const AddressForm = (props: any) => {

    const stateArr = [
        { value: "AndhraPradesh", text: "AndhraPradesh" },
        { value: "Karnataka", text: "Karnataka" },
        { value: "TamilNadu", text: "TamilNadu" },
        { value: "Telungana", text: "Telungana" },
        { value: "Kerala", text: "Kerala" }
    ];

    const countryArr = [
        { value: "India", text: "India" },
        { value: "China", text: "China" },
        { value: "Pakistan", text: "Pakistan" },
        { value: "USA", text: "USA" },
    ];

    const districtArr = [
        { value: "Salem", text: "Salem" },
        { value: "Uthangarai", text: "Uthangarai" },
        { value: "Erode", text: "Erode" },
        { value: "Kirishnagiri", text: "Kirishnagiri" },
    ];
    // style={{ marginLeft: '20%', marginTop: '7%' }}
    return (
        <div>
            <Form.Group>
                <Form.Input
                    required
                    fluid
                    label="Door No."
                    placeholder="Door No."
                    type='text'
                    width={props.doorNoWidth}
                    name="doorNo"
                    maxLength="6"
                    onChange={props.onDoorNoChange}
                    defaultValue={props.doorNo}
                    readOnly={props.read}
                />
                <Form.Input
                    required
                    fluid
                    label="Street"
                    placeholder="Street"
                    type='text'
                    width={props.streetWidth}
                    name="street"
                    onChange={props.onStreetChange}
                    defaultValue={props.street}
                    readOnly={props.read}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    required
                    fluid
                    label="pincode"
                    placeholder="pincode"
                    type='text'
                    width={props.pincodeWidth}
                    name="pincode"
                    maxLength="6"
                    onChange={props.onPincodeChange}
                    defaultValue={props.pincode}
                    readOnly={props.read}
                    error={props.pincodeError}
                />
                <Form.Input
                    required
                    fluid
                    label="Landmark"
                    placeholder="Landmark"
                    type='text'
                    width={props.landMarkWidth}
                    name="landMark"
                    onChange={props.onLandMarkChange}
                    defaultValue={props.landMark}
                    readOnly={props.read}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    required
                    width={props.cityWidth}
                    type="text"
                    label="city"
                    placeholder='city'
                    name="city"
                    maxLength="16"
                    onChange={props.onCityChange}
                    defaultValue={props.city}
                    readOnly={props.read}
                />
                <Form.Select
                    required
                    width={props.districtWidth}
                    label="District"
                    options={districtArr}
                    selection
                    placeholder='District'
                    name="district"
                    onChange={props.onDistrictChange}
                    text={props.district}
                    readOnly={props.read}
                    error={props.districtError}
                />
            </Form.Group>
            <Form.Group>
                <Form.Select
                    required
                    width={props.districtWidth}
                    label="State"
                    options={stateArr}
                    selection
                    placeholder='State'
                    name="state"
                    onChange={props.onStateChange}
                    text={props.state}
                    readOnly={props.read}
                    error={props.stateError}
                />
                <Form.Select
                    required
                    width={props.countryWidth}
                    label="Country"
                    options={countryArr}
                    selection
                    placeholder='Country'
                    name="country"
                    onChange={props.onCountryChange}
                    text={props.country}
                    readOnly={props.read}
                    error={props.countryError}
                />
            </Form.Group>
        </div>
    )
}

export default AddressForm