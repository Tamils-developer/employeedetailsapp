import { exit } from "process";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import {
    Form,
    Grid,
    Container,
    Label,
    Button,
    Loader,
    Dimmer,
} from "semantic-ui-react";

import {
    basicDetails,
    deleteAddressDetails,
    fetchAddressDropdown,
    fetchBasicDetails,
    fetchBasicDetailsDropDown,
    fetchBasicDetailsId,
    filedItems,
    id,
    nextMenu,
    putBasicDetails,
} from "../../reduxComp/slice";
import AddressComponent from "../../reusable_component/AddressComponent";
import ErrorMessage from "../../interface/ErrorMessage";

const errorstyle = ErrorMessage;

//variable declaration
const data = {
    firstName: "",
    lastName: "",
    email: "" as any,
    mobileNum: 0 as any,
    alterMobileNum: false,
    dob: false,
    gender: "" as any,
    aadharNum: 0 as any,
    panNum: false,
    passportNum: false,
    maritalStatus: "" as any,
    bloodGroup: "" as any,
    doorNo: "" as any,
    street: "" as any,
    pincode: "" as any,
    landMark: "" as any,
    country: "" as any,
    state: "" as any,
    district: "" as any,
    city: "" as any,
    comDoorNo: "" as any,
    comStreet: "" as any,
    comPincode: "" as any,
    comLandMark: "" as any,
    comCountry: "" as any,
    comState: "" as any,
    comDistrict: "" as any,
    comCity: "" as any,
};

const address = {
    id: null,
    doorNo: "",
    street: "",
    pincode: "",
    landMark: "",
    country: "",
    state: "",
    district: "",
    city: "",
    type: "",
    sameAsCommu: false,
};

let dummyaddress = {
    id: null,
    doorNo: "",
    street: "",
    pincode: "",
    landMark: "",
    country: "",
    state: "",
    district: "",
    city: "",
    type: "",
    sameAsCommu: false,
};

const inputVal = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    mobileNum: 0,
    alterMobileNum: "",
    dob: "",
    gender: "",
    aadharNum: 0,
    panNum: "",
    passportNum: "",
    maritalStatus: "",
    bloodGroup: "",
    addresses: [] as any,
};

const EmployeeDetailsComponent = () => {
    //Declaring state of inputs
    const [communicationAdd, setCommunicationAdd] = useState({
        ...address,
        type: "communication",
    } as any);
    const [permanentAdd, setPermanentAdd] = useState({
        ...address,
        type: "permanent",
    } as any);
    const [getCommuniAdd, setGetCommuniAdd] = useState({
        ...address,
        type: "communication",
    } as any);
    const [inputs, setInputs] = useState(inputVal);
    const [disable, setDisable] = useState(false);
    const [errors, setErrors] = useState(data);
    const [read, setRead] = useState(false);
    const [messageSpaceStyle, setMessageSpaceStyle] = useState() as any;
    const [errorMessage, setMessage] = useState() as any;
    const [onCheck, setOnCheck] = useState(false);
    const [communId, setCommunId] = useState(null);
    const [nextPage, setNextPage] = useState(true);
    const [loader, setLoader] = useState(false);
    const [maritalStatus, setMaritalStatus] = useState([] as any);
    const [gender, setGender] = useState([] as any);
    const [bloodGroups, setBloodGroups] = useState([] as any);
    const [mapcountry, setMapcountry] = useState() as any;
    const [districtDrop, setDistrictDrop] = useState([]) as any;
    const [stateDrop, setStateDrop] = useState([]) as any;
    const [countryDrop, setCountryDrop] = useState([]) as any;
    const [commDistrictDrop, setCommDistrictDrop] = useState([]) as any;
    const [commStateDrop, setCommStateDrop] = useState([]) as any;
    const [commCountryDrop, setCommCountryDrop] = useState([]) as any;
    const [shouldExit, setShouldExit] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch<any>();
    let selection = {};
    let setErrorss = {};
    let employeeId = useSelector(id);
    const fields = useSelector(filedItems);

    //Date
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let maxDate =
        year -
        18 +
        "-" +
        (month <= 9 ? 0 : "") +
        (month + 1) +
        "-" +
        (date <= 9 ? 0 : "") +
        date;

    //RegexPattern
    const firstNamePattern = /^[A-Za-z\s]*$/;
    const lastNamePattern = /^[A-Za-z\s]*$/;
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    const mobRegex = /[6-9]{1}[0-9]{9}/;
    const altMobRegex = /[6-9]{1}[0-9]{9}/;
    const aadharRegx = /[0-9]{12,12}/;
    const panRegx = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    const passportRegx = /[A-Z0-9]{12,12}/;

    useEffect(() => {
        if (employeeId !== "") {
            setNextPage(true);
            setLoader(true);
        }
        if (employeeId !== null && employeeId !== undefined && employeeId !== "") {
            setCommunId(null);
            setGetCommuniAdd(address);
            setErrors(data);
            dispatch(fetchBasicDetails(employeeId)).then((res: any) => {
                setLoader(false);
                if (res.payload !== undefined) {
                    let dataValues = res.payload;
                    dataValues.addresses?.map((val: any) => {
                        if (val.sameAsCommu === true) {
                            setPermanentAdd(val);
                            setCommunicationAdd(val);
                            setCommunicationAdd((commu: any) => ({
                                ...commu,
                                type: "communication",
                                id: null,
                            }));
                            setRead(true);
                            setOnCheck(true);
                        } else {
                            if (val.type === "permanent") {
                                setPermanentAdd(val);
                            } else {
                                setCommunicationAdd(val);
                                setGetCommuniAdd(val);
                            }
                            setRead(false);
                            setOnCheck(false);
                        }
                        setMessage("");
                        setMessageSpaceStyle({});
                    });
                    setInputs(dataValues);
                }
            });
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setBloodGroups([]);
        setGender([]);
        setMaritalStatus([]);
        dispatch(fetchBasicDetailsDropDown()).then((res: any) => {
            for (const key in res.payload) {
                if (key === "bloodGroupList") {
                    const value = res.payload[key];
                    value.forEach((element: any) => {
                        let obj = {
                            text: element.bloodGroup,
                            value: element.bloodGroup,
                        };
                        setBloodGroups((maritalStatus: any) => [...maritalStatus, obj]);
                    });
                }
                if (key === "genderList") {
                    const value = res.payload[key];
                    value.forEach((element: any) => {
                        let obj = {
                            text: element.gender,
                            value: element.gender,
                        };
                        setGender((gender: any) => [...gender, obj]);
                    });
                }
                if (key === "maritalStatusList") {
                    const value = res.payload[key];
                    value.forEach((element: any) => {
                        let obj = {
                            text: element.maritalStatus,
                            value: element.maritalStatus,
                        };
                        setMaritalStatus((maritalStatus: any) => [...maritalStatus, obj]);
                    });
                }
            }
        });

        dispatch(fetchAddressDropdown()).then((res: any) => {
            setCommCountryDrop([]);
            setCountryDrop([]);
            for (const key in res.payload) {
                let obj = {
                    text: key,
                    value: key,
                };
                setCommCountryDrop((commCountryDrop: any) => [...commCountryDrop, obj]);
                setCountryDrop((countryDrop: any) => [...countryDrop, obj]);
            }
            setMapcountry(res.payload);
        });
    }, []);

    //Storing and setting Errors
    //EmployeeBasic Detail validation
    const handelChange = (event: any, { name, value }: any) => {
        setNextPage(true);
        setInputs({ ...inputs, [name]: value });
        let key = name;
        switch (key) {
            case "firstName":
                setErrors({ ...errors, [name]: !firstNamePattern.test(value) });
                break;
            case "lastName":
                setErrors({ ...errors, [name]: !lastNamePattern.test(value) });
                break;
            case "email":
                if (errors.email === true) {
                    setErrors({ ...errors, [name]: !emailRegex.test(value) });
                }
                break;
            case "mobileNum":
                if (errors.mobileNum === true) {
                    setErrors({ ...errors, [name]: !mobRegex.test(value) });
                }
                break;
            case "alterMobileNum":
                if (errors.alterMobileNum === true) {
                    if (String(event.target.value).length > 0) {
                        setErrors({ ...errors, [name]: !altMobRegex.test(value) });
                    } else {
                        setErrors({ ...errors, [name]: false });
                    }
                }
                break;
            case "dob":
                if (String(event.target.value).length > 1) {
                    setErrors({ ...errors, [name]: false });
                } else {
                    setErrors({ ...errors, [name]: true });
                }
                break;
            case "aadharNum":
                if (errors.aadharNum === true) {
                    setErrors({ ...errors, [name]: !aadharRegx.test(value) });
                }
                break;
            case "panNum":
                if (errors.panNum === true) {
                    if (String(event.target.value).length > 0) {
                        setErrors({ ...errors, [name]: !panRegx.test(value) });
                    } else {
                        setErrors({ ...errors, [name]: false });
                    }
                }
                break;
            case "passportNum":
                if (errors.passportNum === true) {
                    if (String(event.target.value).length > 0) {
                        setErrors({ ...errors, [name]: !passportRegx.test(value) });
                    } else {
                        setErrors({ ...errors, [name]: false });
                    }
                }
                break;
            case "gender":
                setErrors({ ...errors, gender: false });
                break;
            case "maritalStatus":
                setErrors({ ...errors, maritalStatus: false });
                break;
            case "bloodGroup":
                setErrors({ ...errors, bloodGroup: false });
                break;
            default:
                break;
        }
    };

    const comAddressChange = (event: any, { name, value }: any) => {
        // setNextPage(false);
        setCommunicationAdd({ ...communicationAdd, [name]: value });
        let key = name;
        switch (key) {
            case "doorNo":
                setErrors({ ...errors, comDoorNo: false });
                break;
            case "street":
                setErrors({ ...errors, comStreet: false });
                break;
            case "landMark":
                setErrors({ ...errors, comLandMark: false });
                break;
            case "city":
                setErrors({ ...errors, comCity: false });
                break;
            case "pincode":
                setErrors({ ...errors, comPincode: false });
                break;
            case "district":
                setErrors({ ...errors, comDistrict: false });
                break;
            case "state":
                let districtDropdistrict = [] as any;
                if (value !== "") {
                    setCommDistrictDrop(districtDropdistrict);
                    for (const key of mapcountry[communicationAdd.country][value]) {
                        let obj = {
                            text: key,
                            value: key,
                        };
                        setCommDistrictDrop((districtDrop: any) => [...districtDrop, obj]);
                    }
                } else {
                    setCommDistrictDrop(districtDropdistrict);
                }
                setErrors({ ...errors, comState: false });
                break;
            case "country":
                let state = [] as any;
                if (value !== "") {
                    setCommStateDrop(state);
                    for (const key in mapcountry[value]) {
                        let obj = {
                            text: key,
                            value: key,
                        };
                        setCommStateDrop((stateDrop: any) => [...stateDrop, obj]);
                    }
                } else {
                    setCommStateDrop(state);
                }
                setErrors({ ...errors, comCountry: false });
                break;
            default:
                break;
        }
    };

    const permanentAddChange = (event: any, { name, value }: any) => {
        // setNextPage(false);
        setPermanentAdd({ ...permanentAdd, [name]: value });
        let addressInput = { ...permanentAdd, [name]: value };
        setInputs({ ...inputs, addresses: [...inputs.addresses, addressInput] });
        let key = name;
        switch (key) {
            case "doorNo":
                setErrors({ ...errors, doorNo: false });
                break;
            case "street":
                setErrors({ ...errors, street: false });
                break;
            case "landMark":
                setErrors({ ...errors, landMark: false });
                break;
            case "city":
                setErrors({ ...errors, city: false });
                break;
            case "pincode":
                setErrors({ ...errors, pincode: false });
                break;
            case "district":
                setErrors({ ...errors, district: false });
                break;
            case "state":
                let districtDropdistrict = [] as any;
                if (value !== "") {
                    setDistrictDrop(districtDropdistrict);
                    for (const key of mapcountry[permanentAdd.country][value]) {
                        let obj = {
                            text: key,
                            value: key,
                        };
                        setDistrictDrop((districtDrop: any) => [...districtDrop, obj]);
                    }
                } else {
                    setDistrictDrop(districtDropdistrict);
                }
                setErrors({ ...errors, state: false });
                break;
            case "country":
                let state = [] as any;
                if (value !== "") {
                    setStateDrop(state);
                    for (const key in mapcountry[value]) {
                        let obj = {
                            text: key,
                            value: key,
                        };
                        setStateDrop((stateDrop: any) => [...stateDrop, obj]);
                    }
                } else {
                    setStateDrop(state);
                }
                setErrors({ ...errors, country: false });
                break;
            default:
                break;
        }
    };

    //checkBox functions
    const copyFromPermToCommu = (e: any) => {
        let check = e.target.checked;
        if (check) {
            setCommunId(communicationAdd.id);
            setGetCommuniAdd(communicationAdd);
        } else {
            setGetCommuniAdd(address);
            setCommunId(null);
        }
        setInputs({ ...inputs, addresses: [{}] });
        if (check) {
            if (getCommuniAdd.id !== null) {
                setCommunId(getCommuniAdd.id);
            }
            setCommunicationAdd(dummyaddress);
            setCommunicationAdd(() => permanentAdd);
            setCommunicationAdd((commu: any) => ({
                ...commu,
                type: "communication",
                id: null,
            }));
            setPermanentAdd((per: any) => ({ ...per, sameAsCommu: true }));
            if (permanentAdd.state === "") {
                selection = { ...selection, state: true };
            }
            if (permanentAdd.district === "") {
                selection = { ...selection, district: true };
            }
            if (permanentAdd.country === "") {
                selection = { ...selection, country: true };
            }
            if (communicationAdd.state === "") {
                selection = { ...selection, comState: false };
            }
            if (communicationAdd.district === "") {
                selection = { ...selection, comDistrict: false };
            }
            if (communicationAdd.country === "") {
                selection = { ...selection, comCountry: false };
            }
            setErrors({ ...errors, ...selection });
            setRead(true);
        } else {
            if (getCommuniAdd.id !== null) {
                setCommunicationAdd(getCommuniAdd);
            } else {
                setCommunicationAdd(dummyaddress);
                setCommunicationAdd((commu: any) => ({
                    ...commu,
                    type: "communication",
                }));
            }
            setPermanentAdd((per: any) => ({ ...per, sameAsCommu: false }));
            setRead(false);
        }
    };

    //validation
    const checkDropDown = () => {
        if (inputs.gender === "") {
            selection = { ...selection, gender: true };
        }
        if (inputs.bloodGroup === "") {
            selection = { ...selection, bloodGroup: true };
        }
        if (inputs.maritalStatus === "") {
            selection = { ...selection, maritalStatus: true };
        }
        if (onCheck === false) {
            if (communicationAdd.state === "") {
                selection = { ...selection, comState: true };
            }
            if (communicationAdd.district === "") {
                selection = { ...selection, comDistrict: true };
            }
            if (communicationAdd.country === "") {
                selection = { ...selection, comCountry: true };
            }
        }
        if (permanentAdd.state === "") {
            selection = { ...selection, state: true };
        }
        if (permanentAdd.district === "") {
            selection = { ...selection, district: true };
        }
        if (permanentAdd.country === "") {
            selection = { ...selection, country: true };
        }
    };

    //submit
    const isValid = () => {
        let check = true;
        Object.values(setErrorss).forEach((val) => {
            if (val === true) {
                check = false;
            }
        });
        return check;
    };

    const submit = (e: any) => {
        e.preventDefault();
        checkDropDown();
        setErrorss = { ...errors, ...selection };
        setErrors({ ...errors, ...selection });
        if (onCheck === true) {
            try {
                let addressInput = { ...inputs };
                let arr = [{ ...permanentAdd }];
                inputs.addresses = [...arr].slice();
            } catch (err) { }
        } else if (onCheck === false) {
            try {
                setPermanentAdd((per: any) => ({ ...per, sameAsCommu: false }));
                let arr = [{ ...permanentAdd }, { ...communicationAdd }];
                inputs.addresses = [...arr].slice();
            } catch (err) { }
        }
        if (isValid()) {
            if (inputs.id === null) {
                dispatch(fetchBasicDetailsId(inputs)).then((res: any) => {
                    console.log(res)
                    if (res.type === "fetchBasicDetailsId/rejected") {
                        setMessageSpaceStyle(errorstyle.formStyleFailure);
                        setMessage(res.error.message);
                        setNextPage(false);
                        window.scrollTo(0, 0);
                    } else {
                        setInputs({ ...inputs, id: res.data });
                        setMessage(errorstyle.formSubmited);
                        setMessageSpaceStyle(errorstyle.formStyleSuccess);
                        if (shouldExit) {
                            setTimeout(() => {
                                nav("/login");
                            }, 2000);
                        } else {
                            setTimeout(() => {
                                dispatch(nextMenu("Contact Details"));
                            }, 2000);
                        }
                        dispatch(nextMenu({ basicDetails: true }))
                        window.scrollTo(0, 0);
                    }
                });
            } else {
                if (window.confirm("Do you want to confrim the changes")) {
                    if (onCheck && communId !== null) {
                        dispatch(deleteAddressDetails(communId));
                    }
                    dispatch(putBasicDetails(inputs)).then((res: any) => {
                        console.log(res)
                        if (res.type === "putBasicDetails/rejected") {
                            setMessageSpaceStyle(errorstyle.formStyleFailure);
                            setMessage(res.error.message);
                            setNextPage(false);
                            window.scrollTo(0, 0);
                        } else {
                            setMessage(errorstyle.formUpdated);
                            setMessageSpaceStyle(errorstyle.formStyleSuccess);
                            if (shouldExit) {
                                setTimeout(() => {
                                    nav("/login");;
                                }, 2000);
                            } else {
                                setTimeout(() => {
                                    dispatch(nextMenu("Contact Details"));
                                }, 2000);
                            }
                            window.scrollTo(0, 0);
                        }
                    });
                } else {
                    setMessage("");
                    setMessageSpaceStyle({});
                }
            }
        } else {
            setMessageSpaceStyle(errorstyle.formStyleFailure);
            setMessage(errorstyle.formInputFailure);
            window.scrollTo(0, 0);
        }

    };

    //edit
    const edit = (e: any) => {
        e.preventDefault();
        setGetCommuniAdd(address);
        setErrors(data);
        dispatch(fetchBasicDetails(employeeId)).then((res: any) => {
            let dataValues = res.payload;
            dataValues.addresses?.map((val: any) => {
                if (val.sameAsCommu === true) {
                    setPermanentAdd(val);
                    setCommunicationAdd(val);
                    setCommunicationAdd((commu: any) => ({
                        ...commu,
                        type: "communication",
                        id: null,
                    }));
                    setRead(true);
                    setOnCheck(true);
                } else {
                    if (val.type === "permanent") {
                        setPermanentAdd(val);
                    } else {
                        setCommunicationAdd(val);
                        setGetCommuniAdd(val);
                    }
                    setRead(false);
                    setOnCheck(false);
                }
            });
            setInputs(dataValues);
            setNextPage(true);
        });
        setMessage("");
        setMessageSpaceStyle({});
    };

    return (
        <div>
            <Container>
                <Form
                    id="form emp"
                    onSubmit={(e) => submit(e)}
                    onKeyPress={(e: any) => {
                        e.key === "Enter" && e.preventDefault();
                    }}
                >
                    <div>
                        <h5 style={messageSpaceStyle}>{errorMessage}</h5>
                    </div>
                    <div className="ui segment">
                        <Dimmer active={loader} inverted>
                            <Loader size="large">Loading</Loader>
                        </Dimmer>
                        <Grid centered>
                            <Grid.Column className="form-column">
                                <h2 className="ui header" style={{ color: "#2d7cfa" }}>
                                    <div className="content">
                                        Employee Basic Details
                                    </div>
                                </h2>
                                <Form.Group>
                                    <Form.Input
                                        required
                                        name="firstName"
                                        width={8}
                                        label="First Name"
                                        type="text"
                                        disabled={disable}
                                        value={inputs.firstName || ""}
                                        id="firstname"
                                        placeholder="First name"
                                        onChange={handelChange}
                                        onBlur={(e: any) =>
                                            setInputs({
                                                ...inputs,
                                                [e.target.name]: e.target.value.trim(),
                                            })
                                        }
                                        error={
                                            errors.firstName
                                                ? {
                                                    content: "Only alphabets are allowed",
                                                }
                                                : false
                                        }
                                    />
                                    <Form.Input
                                        required
                                        name="lastName"
                                        width={8}
                                        type="text"
                                        disabled={disable}
                                        value={inputs.lastName || ""}
                                        id="lastname"
                                        label="Last Name"
                                        placeholder="Last name"
                                        onChange={handelChange}
                                        onBlur={(e: any) =>
                                            setInputs({
                                                ...inputs,
                                                [e.target.name]: e.target.value.trim(),
                                            })
                                        }
                                        error={
                                            errors.lastName
                                                ? {
                                                    content: "Only alphabets are allowed",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        required
                                        type="email"
                                        id="email"
                                        disabled={disable}
                                        name="email"
                                        label="Email"
                                        value={inputs.email || ""}
                                        placeholder="name@gmail.com"
                                        width={16}
                                        onChange={handelChange}
                                        onBlur={(e: any) =>
                                            setErrors({
                                                ...errors,
                                                [e.target.name]: !emailRegex.test(e.target.value),
                                            })
                                        }
                                        error={
                                            errors.email
                                                ? {
                                                    content: "Entered email address is  not valid",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        required
                                        type="text"
                                        id="mobile"
                                        disabled={disable}
                                        name="mobileNum"
                                        label="Mobile Number"
                                        value={inputs.mobileNum || ""}
                                        placeholder="mobile"
                                        onBlur={(e: any) =>
                                            setErrors({
                                                ...errors,
                                                [e.target.name]: !mobRegex.test(e.target.value),
                                            })
                                        }
                                        maxLength="10"
                                        width={16}
                                        onChange={handelChange}
                                        error={
                                            errors.mobileNum
                                                ? {
                                                    content: " Entered Mobile number is  not valid.",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        type="text"
                                        id="mobile"
                                        label="Alternate Mobile Number"
                                        placeholder="Alternate mobile"
                                        maxLength="10"
                                        width={16}
                                        disabled={disable}
                                        pattern="[6-9]{1}[0-9]{9}"
                                        name="alterMobileNum"
                                        onBlur={(e: any) => {
                                            if (String(e.target.value).length > 0) {
                                                setErrors({
                                                    ...errors,
                                                    [e.target.name]: !mobRegex.test(e.target.value),
                                                });
                                            }
                                        }}
                                        value={inputs.alterMobileNum || ""}
                                        onChange={handelChange}
                                        error={
                                            errors.alterMobileNum
                                                ? {
                                                    content: "Entered Mobile number is  not valid",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        type="date"
                                        required
                                        disabled={disable}
                                        id="dob"
                                        label="Date of Birth"
                                        placeholder="date of birth"
                                        value={inputs.dob || ""}
                                        max={maxDate}
                                        width={8}
                                        name="dob"
                                        onChange={handelChange}
                                    />
                                    <Form.Dropdown
                                        width={8}
                                        required
                                        label="Gender"
                                        options={gender}
                                        selection
                                        disabled={disable}
                                        placeholder="Gender"
                                        value={inputs.gender || ""}
                                        name="gender"
                                        onChange={handelChange}
                                        error={
                                            errors.gender
                                                ? {
                                                    content: "This is a Requird filed",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        type="text"
                                        required
                                        id="aadhar"
                                        label="Aadhar Number"
                                        placeholder="UIDAI Number"
                                        value={inputs.aadharNum || ""}
                                        maxLength="12"
                                        disabled={disable}
                                        width={8}
                                        name="aadharNum"
                                        onBlur={(e: any) =>
                                            setErrors({
                                                ...errors,
                                                [e.target.name]: !aadharRegx.test(e.target.value),
                                            })
                                        }
                                        onChange={handelChange}
                                        error={
                                            errors.aadharNum
                                                ? {
                                                    content: "Entered Aadhar number is  not valid",
                                                }
                                                : false
                                        }
                                    />
                                    <Form.Input
                                        type="text"
                                        id="passport"
                                        label="Passport Number"
                                        placeholder="Passport Number"
                                        value={inputs.passportNum || ""}
                                        maxLength="12"
                                        disabled={disable}
                                        width={8}
                                        name="passportNum"
                                        onBlur={(e: any) => {
                                            if (String(e.target.value).length > 0) {
                                                setErrors({
                                                    ...errors,
                                                    [e.target.name]: !passportRegx.test(e.target.value),
                                                });
                                            }
                                        }}
                                        onChange={handelChange}
                                        error={
                                            errors.passportNum
                                                ? {
                                                    content: "Entered Passport number is  not valid",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        type="text"
                                        id="pan"
                                        label="PAN Number"
                                        value={inputs.panNum || ""}
                                        placeholder="PAN number"
                                        width={16}
                                        name="panNum"
                                        disabled={disable}
                                        maxLength="10"
                                        onChange={handelChange}
                                        onBlur={(e: any) => {
                                            if (String(e.target.value).length > 0) {
                                                setErrors({
                                                    ...errors,
                                                    [e.target.name]: !panRegx.test(e.target.value),
                                                });
                                            }
                                        }}
                                        error={
                                            errors.panNum
                                                ? {
                                                    content: "Entered PAN number is  not valid.",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Select
                                        required
                                        disabled={disable}
                                        width={8}
                                        label="Marital Status"
                                        options={maritalStatus}
                                        value={inputs.maritalStatus || ""}
                                        selection
                                        placeholder="Marital Status"
                                        name="maritalStatus"
                                        onChange={handelChange}
                                        error={
                                            errors.maritalStatus
                                                ? {
                                                    content: "This is a Requird filed",
                                                }
                                                : false
                                        }
                                    />
                                    <Form.Dropdown
                                        required
                                        width={8}
                                        label="Blood Group"
                                        disabled={disable}
                                        options={bloodGroups}
                                        value={inputs.bloodGroup || ""}
                                        selection
                                        placeholder="Blood Group"
                                        name="bloodGroup"
                                        onChange={handelChange}
                                        error={
                                            errors.bloodGroup
                                                ? {
                                                    content: "This is a Requird filed",
                                                }
                                                : false
                                        }
                                    />
                                </Form.Group>
                            </Grid.Column>
                        </Grid>
                        <div className="row">
                            <h4>Permanent Address</h4>
                            <AddressComponent
                                read={disable}
                                handleChange={permanentAddChange}
                                dropdownChange={permanentAddChange}
                                doorNo={permanentAdd.doorNo}
                                pincode={permanentAdd.pincode}
                                city={permanentAdd.city}
                                street={permanentAdd.street}
                                landMark={permanentAdd.landMark}
                                district={permanentAdd.district}
                                state={permanentAdd.state}
                                country={permanentAdd.country}
                                countryArr={countryDrop}
                                stateArr={stateDrop}
                                districtArr={districtDrop}
                                doorNoWidth={8}
                                pincodeWidth={8}
                                streetWidth={8}
                                countryWidth={8}
                                stateWidth={8}
                                landMarkWidth={8}
                                cityWidth={8}
                                districtWidth={8}
                                stateError={
                                    errors.state
                                        ? {
                                            content: "This is a Requird filed",
                                        }
                                        : false
                                }
                                districtError={
                                    errors.district
                                        ? {
                                            content: "This is a Requird filed",
                                        }
                                        : false
                                }
                                countryError={
                                    errors.country
                                        ? {
                                            content: "This is a Requird filed",
                                        }
                                        : false
                                }
                            />
                            <Grid centered>
                                <Grid.Column className="form-column">
                                    <h4>Communication Address</h4>
                                    <Label style={{ marginBottom: "2%" }}>
                                        <input
                                            disabled={disable}
                                            type="checkbox"
                                            id={"check"}
                                            onClick={copyFromPermToCommu}
                                            onChange={() => setOnCheck(!onCheck)}
                                            checked={onCheck}
                                        />
                                        <span> </span>Communication Address and Permanent Address
                                        are same
                                    </Label>
                                    <AddressComponent
                                        handleChange={comAddressChange}
                                        dropdownChange={comAddressChange}
                                        doorNo={communicationAdd.doorNo}
                                        pincode={communicationAdd.pincode}
                                        city={communicationAdd.city}
                                        street={communicationAdd.street}
                                        landMark={communicationAdd.landMark}
                                        district={communicationAdd.district}
                                        state={communicationAdd.state}
                                        country={communicationAdd.country}
                                        countryArr={commCountryDrop}
                                        stateArr={commStateDrop}
                                        districtArr={commDistrictDrop}
                                        doorNoWidth={8}
                                        pincodeWidth={8}
                                        streetWidth={8}
                                        countryWidth={8}
                                        stateWidth={8}
                                        landMarkWidth={8}
                                        cityWidth={8}
                                        districtWidth={8}
                                        read={read || disable}
                                        stateError={
                                            errors.comState
                                                ? {
                                                    content: "This is a Requird filed",
                                                }
                                                : false
                                        }
                                        districtError={
                                            errors.comDistrict
                                                ? {
                                                    content: "This is a Requird filed",
                                                }
                                                : false
                                        }
                                        countryError={
                                            errors.comCountry
                                                ? {
                                                    content: "This is a Requird filed",
                                                }
                                                : false
                                        }
                                    />
                                </Grid.Column>
                            </Grid>
                        </div>
                    </div>
                    <div className="btns">
                        <Button color="vk" onClick={edit}>
                            Edit
                        </Button>
                        <Button color="vk" onClick={(e) => { setShouldExit(true) }}>
                            Save And Next
                        </Button>
                        <Button color="vk" onClick={(e) => { setShouldExit(true) }}>
                            Save And Exit
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default EmployeeDetailsComponent;
