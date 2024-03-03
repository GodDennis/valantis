import { Filter } from "@/types/types";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "@mui/material";

type FilterFormProps = {
    onSubmit: (data: Filter) => void;
};

export const FilterForm = ({ onSubmit }: FilterFormProps) => {
    const { register, handleSubmit } = useFormContext();
    return (
        <aside>
            <h2>Add Filter</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("product")}
                    label='Title'
                    placeholder='Введите название товара'
                />
                <Input
                    {...register("price")}
                    label='Price'
                    placeholder='Укажите цену'
                />
                <Input
                    {...register("brand")}
                    label='Brand'
                    placeholder='Введите бренд'
                />
                <Button type='submit' />
            </form>
        </aside>
    );
};
