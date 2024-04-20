import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class checkPassword implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments): boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
