import { Filter } from "@/types/types";
import { useFormContext } from "react-hook-form";

import { useGetFieldsQuery } from "@/services/productsApi";
import { getUniqueListBy } from "@/utils/UniqueList";
import s from "./filter.module.scss";
import { ControlledInput } from "../ui/input/ControlledInput";
import { ControlledSelect } from "../ui/select/ControlledSelect";
import { Button } from "../ui/button";

type FilterFormProps = {
    onSubmit: (data: Filter) => void;
};

type Options = {
    label: string;
    value: string;
};

export const FilterForm = ({ onSubmit }: FilterFormProps) => {
    const { handleSubmit, control } = useFormContext();
    const { data } = useGetFieldsQuery();

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlledInput
                    className={s.textField}
                    control={control}
                    name={"product"}
                    label='Title'
                    placeholder='Введите название товара'
                />
                <ControlledInput
                    control={control}
                    name={"price"}
                    className={s.textField}
                    label='Price'
                    placeholder='Укажите цену'
                    type='number'
                />
                {uniqOptions && (
                    <ControlledSelect
                        control={control}
                        name={"brand"}
                        className={s.select}
                        options={uniqOptions}
                        placeholder='Brand'
                    />
                )}
                <Button
                    fullWidth
                    type='submit'
                    children='submit'
                />
            </form>
        </aside>
    );
};
