import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name: 'checkPassword ', async: false})
export class checkPassword implements ValidatorConstraintInterface{
    validate(password: string, args: ValidationArguments) {
        if (password !== (args.object as any)[args.constraints[0]]) return false;
        return true;
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Passwords do not match'
    }
}   