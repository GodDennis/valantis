import { ComponentPropsWithoutRef, ReactNode, forwardRef, memo, useState } from "react";

import { Typography } from "@/components/ui/typography";

import * as SelectRadix from "@radix-ui/react-select";

import s from "./select.module.scss";
import { ArrowUp } from "../assets/icons/ArrowUp";
import { ArrowDown } from "../assets/icons/ArrowDown";

export type SelectProps = {
    defaultValue?: string;
    disabled?: boolean;
    label?: string;
    onOpenChange?: () => void;
    onValueChange?: (value: string) => void;
    options?: { label: string; value: string }[];
    placeholder?: string;
    value?: string;
    name: string;
} & Omit<ComponentPropsWithoutRef<"select">, "dir" | "onChange" | "value">;

export const Select = memo(
    forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {
        const {
            className,
            disabled = false,
            label,
            onOpenChange,
            onValueChange,
            options,
            placeholder,
            name,
            value,
            ...rest
        } = props;
        const [open, setOpen] = useState(false);
        const handleValueChange = (value: string) => {
            onValueChange?.(value);
        };
        const handleOpenChange = () => {
            onOpenChange?.();
            setOpen(!open);
        };

        return (
            <div className={s.selectRoot}>
                <Typography
                    className={disabled ? s.labelDisabled : s.label}
                    variant={"body2"}>
                    {label}
                </Typography>
                <SelectRadix.Root
                    name={name}
                    // disabled={disabled}
                    onOpenChange={handleOpenChange}
                    onValueChange={handleValueChange}
                    value={value}
                    {...rest}>
                    <SelectRadix.Trigger
                        disabled={disabled}
                        className={`${className} ${s.SelectTrigger}`}>
                        <SelectRadix.Value
                            ref={ref}
                            placeholder={<Typography variant={"body1"}>{placeholder}</Typography>}
                        />
                        <SelectRadix.Icon className={s.SelectIcon}>
                            {open && (
                                <ArrowUp fill={disabled ? "var(--color-dark-300)" : "white"} />
                            )}
                            {!open && (
                                <ArrowDown fill={disabled ? "var(--color-dark-300)" : "white"} />
                            )}
                        </SelectRadix.Icon>
                    </SelectRadix.Trigger>
                    <SelectRadix.Portal>
                        <SelectRadix.Content
                            className={s.SelectContent}
                            position={"popper"}
                            sideOffset={-1}>
                            <SelectRadix.Viewport>
                                <SelectRadix.Group>
                                    {options?.map((option, index) => (
                                        <SelectItem
                                            key={index}
                                            value={option?.value}>
                                            {option?.label}
                                        </SelectItem>
                                    ))}
                                </SelectRadix.Group>
                            </SelectRadix.Viewport>
                        </SelectRadix.Content>
                    </SelectRadix.Portal>
                </SelectRadix.Root>
            </div>
        );
    })
);

const SelectItem = (props: { children?: ReactNode; disabled?: boolean; value: string }) => {
    return (
        <SelectRadix.Item
            className={s.SelectItem}
            disabled={props.disabled}
            value={props.value}>
            <SelectRadix.ItemText>
                <Typography
                    style={{ margin: 0 }}
                    variant={"body1"}>
                    {props.children}
                </Typography>
            </SelectRadix.ItemText>
        </SelectRadix.Item>
    );
};
