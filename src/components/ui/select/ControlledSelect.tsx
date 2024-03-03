import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { SelectProps, Select } from ".";

type ControlledSelectProps<T extends FieldValues> = Omit<
    UseControllerProps<T>,
    "disabled" | "rules"
> &
    Omit<SelectProps, "value">;

export const ControlledSelect = <T extends FieldValues>({
    control,
    shouldUnregister,
    ...rest
}: ControlledSelectProps<T>) => {
    const {
        field: { onChange, value, ref },
    } = useController({
        control,
        disabled: rest.disabled,
        name: rest.name,
        shouldUnregister,
    });
    return (
        <Select
            {...rest}
            onValueChange={onChange}
            value={value}
            ref={ref}
        />
    );
};
