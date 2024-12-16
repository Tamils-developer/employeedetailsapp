import React, { useState } from 'react'
import { Container, Form, Segment } from 'semantic-ui-react'


const AddressComponent = (props: any) => {
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
                    onChange={props.handleChange}
                    value={props.doorNo || ""}
                    disabled={props.read}
                />
                <Form.Input
                    required
                    fluid
                    label="Street"
                    placeholder="Street"
                    type='text'
                    width={props.streetWidth}
                    name="street"
                    onChange={props.handleChange}
                    value={props.street || ""}
                    disabled={props.read}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    required
                    fluid
                    label="Pincode"
                    placeholder="Pincode"
                    type='number'
                    width={props.pincodeWidth}
                    name="pincode"
                    onChange={props.handleChange}
                    value={props.pincode || ""}
                    disabled={props.read}
                    error={props.pincodeError}
                />
                <Form.Input
                    fluid
                    label="Landmark"
                    placeholder="Landmark"
                    type='text'
                    width={props.landMarkWidth}
                    name="landMark"
                    onChange={props.handleChange}
                    value={props.landMark || ""}
                    disabled={props.read}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    required
                    width={props.cityWidth}
                    type="text"
                    label="City"
                    placeholder='City'
                    name="city"
                    maxLength="35"
                    onChange={props.handleChange}
                    value={props.city || ""}
                    disabled={props.read}
                />
                <Form.Dropdown
                    required
                    width={props.countryWidth}
                    label="Country"
                    options={props.countryArr}
                    selection
                    placeholder='Country'
                    name="country"
                    clearable
                    floating
                    search
                    onChange={props.dropdownChange}
                    value={props.country || ""}
                    text={props.country}
                    disabled={props.read}
                    error={props.countryError}
                />

            </Form.Group>
            <Form.Group>
                <Form.Dropdown
                    required
                    width={props.stateWidth}
                    label="State"
                    options={props.stateArr}
                    selection
                    placeholder='State'
                    name="state"
                    clearable
                    search
                    floating
                    onChange={props.dropdownChange}
                    value={props.state || ""}
                    text={props.state}
                    error={props.stateError}
                    disabled={props.read}
                />
                <Form.Dropdown
                    required
                    width={props.districtWidth}
                    label="District"
                    options={props.districtArr}
                    selection
                    placeholder='District'
                    name="district"
                    clearable
                    search
                    floating
                    onChange={props.dropdownChange}
                    value={props.district || ""}
                    text={props.district}
                    error={props.districtError}
                    disabled={props.read}
                />
            </Form.Group>
        </div>
    )
}

export default AddressComponent;