import React, { useEffect, useState } from 'react'
import { Form, Grid, Header, Icon, Segment, Input, Container } from 'semantic-ui-react'
import axios from 'axios';
import { Progress } from 'semantic-ui-react';
import { nextMenu } from '../reduxComp/slice';
import { useDispatch } from 'react-redux';

const data = {
    aadharCard: '',
    panCard: '',
    tenthMarkSheet: '',
    twelthMarkSheet: '',
    ugMarkSheet: '',
    pgMarkSheet: '',
    passportSizePhoto: '',
    form16: '',
    paySlip: '',
    releaseExperienceLetter: ''
}
let extensions_REGX = /(\.jpg|\.jpeg|\.png)$/i;
const DocumentsUpload = () => {
    const [error, setError] = useState(data as any)
    const [inputValues, setInputValues] = useState(data as any)
    // const [fileData, setFileData] = useState({uploadPercentage: 0,avatar: ''})
    const [fileData, setFileData] = useState(data as any)
    const [checkbox, setCheckbox] = useState(data as any)
    const dispatch = useDispatch<any>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validateSelectedFile = (e: any) => {
        setError({ ...error, [e.target.name]: '' })
        setCheckbox({ ...checkbox, [e.target.name]: '' })
        let span = '';
        let fileUpload = e.target;
        let fileName = fileUpload.files[0].name;
        if (!extensions_REGX.exec(fileName)) {
            span = '*File type invalid'
            setError({ ...error, [e.target.name]: span })
            setInputValues({ ...inputValues, [e.target.name]: '' })
            return false;
        } else {
            if (typeof (fileUpload.files) != "undefined") {
                let size = Number((fileUpload.files[0].size / 1024).toFixed(2));
                if (size > 2048) {
                    span = '*File size is big'
                    setError({ ...error, [e.target.name]: span })
                } else {
                    let input = fileUpload.files[0];
                    console.log(fileUpload.files);

                    setInputValues({ ...inputValues, [e.target.name]: input })
                    console.log(input);
                    let formData = new FormData();
                    formData.append('file', fileUpload.files);
                    console.log(formData);

                    const options = {
                        onUploadProgress: (progressEvent: any) => {
                            setCheckbox({ ...checkbox, [e.target.name]: '' })
                            const { loaded, total } = progressEvent;
                            let percent = Math.floor((loaded * 100) / total)
                            console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                            if (percent < 100) {
                                setFileData({ ...fileData, [e.target.name]: percent })
                            }
                            if (percent == 100) {
                                setFileData({ ...fileData, [e.target.name]: percent })
                                setCheckbox({ ...checkbox, [e.target.name]: percent })
                            }
                            setTimeout(() => {
                                setFileData({ ...fileData, [e.target.name]: '' })
                            }, 1000);
                        }
                    }

                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data',
                        },
                    };
                    axios.post("https://api.imgur.com/3/image", input, options)
                        .then(res => console.log(res))
                        .catch(error => console.log(error.response.status))
                    // .then(res => { 
                    // console.log(res)
                    // setFileData({...fileData,[e.target.name]:100})
                    // , ()=>{
                    // setTimeout(() => {
                    //     setFileData({...fileData, [e.target.name]: '' })
                    // }, 1000);
                    // }
                    // })
                }
            }
        }
    };
    let finalError = false
    let errorObject = error
    const validateError = () => {
        for (const key in inputValues) {
            if (`${inputValues[key]}` === '') {
                finalError = false;
                let keys = key;
                switch (keys) {
                    case 'aadharCard':
                        errorObject = { ...errorObject, aadharCard: errorObject.aadharCard === '' ? 'Nothing Selected' : errorObject.aadharCard }
                        break;
                    case 'panCard':
                        errorObject = { ...errorObject, panCard: errorObject.panCard === '' ? 'Nothing Selected' : errorObject.panCard }
                        break;
                    case 'tenthMarkSheet':
                        errorObject = { ...errorObject, tenthMarkSheet: errorObject.tenthMarkSheet === '' ? 'Nothing Selected' : errorObject.tenthMarkSheet }
                        break;
                    case 'twelthMarkSheet':
                        errorObject = { ...errorObject, twelthMarkSheet: errorObject.twelthMarkSheet === '' ? 'Nothing Selected' : errorObject.twelthMarkSheet }
                        break;
                    case 'ugMarkSheet':
                        errorObject = { ...errorObject, ugMarkSheet: errorObject.ugMarkSheet === '' ? 'Nothing Selected' : errorObject.ugMarkSheet }
                        break;
                    case 'pgMarkSheet':
                        errorObject = { ...errorObject, pgMarkSheet: errorObject.pgMarkSheet === '' ? 'Nothing Selected' : errorObject.pgMarkSheet }
                        break;
                    case 'passportSizePhoto':
                        errorObject = { ...errorObject, passportSizePhoto: errorObject.passportSizePhoto === '' ? 'Nothing Selected' : errorObject.passportSizePhoto }
                        break;
                    case 'form16':
                        errorObject = { ...errorObject, form16: errorObject.form16 === '' ? 'Nothing Selected' : errorObject.form16 }
                        break;
                    case 'paySlip':
                        errorObject = { ...errorObject, paySlip: errorObject.paySlip === '' ? 'Nothing Selected' : errorObject.paySlip }
                        break;
                    case 'releaseExperienceLetter':
                        errorObject = { ...errorObject, releaseExperienceLetter: errorObject.releaseExperienceLetter === '' ? 'Nothing Selected' : errorObject.releaseExperienceLetter }
                        break;
                    default:
                        break;
                }
            } else {
                finalError = true;
            }
            setError(errorObject)
        }
    }
    const submit = (e: any) => {
        validateError()
        let send = true;
        for (const key in errorObject) {
            if (`${errorObject[key]}` !== '') {
                send = false
            }
        }
        if (send === true) {
            e.preventDefault()
        }
    }
    console.log(checkbox);
    const moveNext = (e: any) => {
        e.preventDefault();
        dispatch(nextMenu('Work Experiece'))
    }

    const Prev = (e: any) => {
        e.preventDefault();
        dispatch(nextMenu("Bank Details"));
    };

    return (
        <div>
            <Form onSubmit={submit}>
                <Container>
                    <Segment>
                        <Grid columns={3}>
                            <Grid.Column></Grid.Column>
                            <Grid.Column>
                                <Header icon style={{ color: "#2d7cfa" }}>
                                    <Icon name='file pdf' />
                                    Upload Your Documents here
                                </Header>
                            </Grid.Column>
                        </Grid>
                        <Grid columns={3}>
                            <Grid.Column></Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='aadharCard'
                                        label='Aadhar Card :'
                                        onChange={validateSelectedFile}
                                        error={error.aadharCard !== '' ? { content: error.aadharCard, pointing: 'above' } : false}
                                        action={checkbox.aadharCard !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.aadharCard > 0 && <Progress percent={fileData.aadharCard} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='panCard'
                                        label='PAN Card :'
                                        onChange={validateSelectedFile}
                                        error={error.panCard !== '' ? { content: error.panCard, pointing: 'above' } : false}
                                        action={checkbox.panCard !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.panCard > 0 && <Progress percent={fileData.panCard} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='tenthMarkSheet'
                                        label='10th Mark Sheet :'
                                        onChange={validateSelectedFile}
                                        error={error.tenthMarkSheet !== '' ? { content: error.tenthMarkSheet, pointing: 'above' } : false}
                                        action={checkbox.tenthMarkSheet !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.tenthMarkSheet > 0 && <Progress percent={fileData.tenthMarkSheet} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='twelthMarkSheet'
                                        label='12th Mark Sheet :'
                                        onChange={validateSelectedFile}
                                        error={error.twelthMarkSheet !== '' ? { content: error.twelthMarkSheet, pointing: 'above' } : false}
                                        action={checkbox.twelthMarkSheet !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.twelthMarkSheet > 0 && <Progress percent={fileData.twelthMarkSheet} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='ugMarkSheet'
                                        label='UG Mark Sheet :'
                                        onChange={validateSelectedFile}
                                        error={error.ugMarkSheet !== '' ? { content: error.ugMarkSheet, pointing: 'above' } : false}
                                        action={checkbox.ugMarkSheet !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.ugMarkSheet > 0 && <Progress percent={fileData.ugMarkSheet} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='pgMarkSheet'
                                        label='PG Mark Sheet :'
                                        onChange={validateSelectedFile}
                                        error={error.pgMarkSheet !== '' ? { content: error.pgMarkSheet, pointing: 'above' } : false}
                                        action={checkbox.pgMarkSheet !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.pgMarkSheet > 0 && <Progress percent={fileData.pgMarkSheet} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='passportSizePhoto'
                                        label='Passport Size Photo :'
                                        onChange={validateSelectedFile}
                                        error={error.passportSizePhoto !== '' ? { content: error.passportSizePhoto, pointing: 'above' } : false}
                                        action={checkbox.passportSizePhoto !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.passportSizePhoto > 0 && <Progress percent={fileData.passportSizePhoto} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='form16'
                                        label='Form 16 :'
                                        onChange={validateSelectedFile}
                                        error={error.form16 !== '' ? { content: error.form16, pointing: 'above' } : false}
                                        action={checkbox.form16 !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.form16 > 0 && <Progress percent={fileData.form16} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        width={16}
                                        type="file"
                                        name='paySlip'
                                        label='Pay Slip :'
                                        onChange={validateSelectedFile}
                                        error={error.paySlip !== '' ? { content: error.paySlip, pointing: 'above' } : false}
                                        action={checkbox.paySlip !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.paySlip > 0 && <Progress percent={fileData.paySlip} progress indicating />}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        multiple
                                        width={16}
                                        type="file"
                                        name='releaseExperienceLetter'
                                        label='Release Letter/Experience Letter'
                                        onChange={validateSelectedFile}
                                        error={error.releaseExperienceLetter !== '' ? { content: error.releaseExperienceLetter, pointing: 'above' } : false}
                                        action={checkbox.releaseExperienceLetter !== '' && {
                                            color: 'teal',
                                            icon: 'check',
                                        }}
                                    />
                                    {fileData.releaseExperienceLetter > 0 && <Progress percent={fileData.releaseExperienceLetter} progress indicating />}
                                </Form.Field>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Grid columns={3}>
                        <Grid.Column></Grid.Column>
                        <Grid.Column>
                            <Form.Group>
                                <Form.Button color="vk" onClick={Prev}>
                                    Back
                                </Form.Button>
                                <Form.Button color='vk' inline>
                                    Edit
                                </Form.Button>
                                <Form.Button color='vk' inline>
                                    Save
                                </Form.Button>
                                <Form.Button color='vk' inline onClick={moveNext}>
                                    Next
                                </Form.Button>
                            </Form.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Form>
        </div>
    )
}

export default DocumentsUpload