import { Filter } from "@/types/types";
import { useFormContext } from "react-hook-form";

import { useGetFieldsQuery } from "@/services/productsApi";
import { getUniqueListBy } from "@/utils/UniqueList";
import s from "./filter.module.scss";
import { ControlledInput } from "../ui/input/ControlledInput";
import { ControlledSelect } from "../ui/select/ControlledSelect";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

type FilterFormProps = {
    onSubmit: (data: Filter) => void;
    onToogle: (value: boolean) => void;
};

type Options = {
    label: string;
    value: string;
};

export const FilterForm = ({ onSubmit, onToogle }: FilterFormProps) => {
    const navigate = useNavigate();
    const { handleSubmit, control, formState, reset } = useFormContext();
    const dirtyFilds = Object.keys(formState.dirtyFields);
    const { data } = useGetFieldsQuery();
    const disabled = useRef(true);

    const options: Options[] = [];
    data?.result.map(el => {
        if (typeof el !== "object") {
            options.push({ label: el, value: el });
        }
    });

    const uniqOptions = getUniqueListBy(options, "value");

    return (
        <aside>
            <h2>Add Filter</h2>
            <form
                className={s.filterForm}
                onSubmit={handleSubmit(onSubmit)}>
                <ControlledInput
                    className={s.textField}
                    control={control}
                    name={"product"}
                    label='Title'
                    placeholder='Введите название товара'
                    disabled={dirtyFilds.includes("brand") || dirtyFilds.includes("price")}
                />
                <ControlledInput
                    control={control}
                    name={"price"}
                    className={s.textField}
                    label='Price'
                    placeholder='Укажите цену'
                    type='number'
                    disabled={dirtyFilds.includes("product") || dirtyFilds.includes("brand")}
                />
                {uniqOptions && (
                    <ControlledSelect
                        control={control}
                        name={"brand"}
                        className={s.select}
                        options={uniqOptions}
                        placeholder='Brand'
                        disabled={dirtyFilds.includes("product") || dirtyFilds.includes("price")}
                    />
                )}
                <div className={s.buttonsBlock}>
                    {" "}
                    <Button
                        className={s.submit}
                        fullWidth
                        type='submit'
                        children='Подтвердить'
                        onClick={() => {
                            disabled.current = false;
                        }}
                    />
                    <Button
                        fullWidth
                        type='reset'
                        variant='secondary'
                        children='Сбросить'
                        disabled={disabled.current}
                        onClick={() => {
                            disabled.current = true;
                            reset();
                            onToogle(false);
                            navigate("/1");
                        }}
                    />
                </div>
            </form>
        </aside>
    );
};
