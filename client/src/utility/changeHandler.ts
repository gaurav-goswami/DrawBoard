import { IChangeHandler } from "../Interface";

const changeHandler : IChangeHandler = (e, setter, state) => {
    const {name, value} = e.target;
    setter({...state, [name] : value});
}

export default changeHandler;