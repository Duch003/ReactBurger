import IValidationRuleSet from "./ValidationRuleSet";

export default interface IInputElement<TValue> {
    elementType: string,
    elementConfig: any,
    value: TValue,
    validation?: IValidationRuleSet,
    valid: boolean,
    touched: boolean
}