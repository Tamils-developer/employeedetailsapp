import DropdownOptionInterface from "../interface/DropdownOptionInterface";
import LabelComp from "./LabelComp";

const DropdownComp = (props:any) => {

    //const optionArr = props.optionDetail;

    return (
        <div>
            <LabelComp lblName={props.dpName} />
            <select name={props.dpName} onChange={props.chngFn}>
                <option value="Select">Select</option>
                {
                    props.optionDetail.map((optionVal:DropdownOptionInterface) => (
                        /*(optionVal.optionDisplay=="TamilNadu") ? 
                        <option value={optionVal.optionValue} selected>{optionVal.optionDisplay}</option>
                        : <option value={optionVal.optionValue}>{optionVal.optionDisplay}</option>*/
                        <option value={optionVal.optionValue}>{optionVal.optionDisplay}</option>                        
                    ))
                }
            </select>
        </div>
    );
}

export default DropdownComp;