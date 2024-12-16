import { LabelInterface } from "../interface/LabelInterface";

const LabelComp = (props:any) => {

    return (
        <label style={props.styDetail}>{props.lblName}</label>
    )
}

export default LabelComp;