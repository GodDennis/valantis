import {
    useGetFieldsQuery,
    useGetIdsQuery,
    useGetItemsQuery,
    useGetPaginationIdsQuery,
    useLazyGetFilteredQuery,
} from "./services/productsApi";
import Loader from "./components/ui/Loader/Loader";
import { getUniqueId, getUniqueListBy } from "./utils/UniqueList";
import { Pagination } from "./components/ui/pagination";
import { useParams } from "react-router-dom";
import { Filter } from "./types/types";
import { ProductsTable } from "./components/ui/table/DescTable/ProductsTable";
import s from "./app.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { FilterForm } from "./components/layout/Filter";
import { splitArrayIntoChunks } from "./utils/splitArrayIntoChunks";

function App() {
    const { pageCount } = useParams<{ pageCount: string }>();

    const page = pageCount ? +pageCount : 1;
    const limit = 50;
    const { data: PaginationCount } = useGetPaginationIdsQuery();
    const { isLoading: getFieldsLoading } = useGetFieldsQuery();
    const {
        isLoading: getIdsLoading,
        isFetching: getIdsFetching,
        data: ids,
    } = useGetIdsQuery({ offset: page - 1, limit });

    const [getFilteredIds, { data: filteredIds }] = useLazyGetFilteredQuery();

    const paginationIdsWithoutDuplicates = getUniqueId(PaginationCount?.result);
    const productsIdsWithoutDuplicates = getUniqueId(ids?.result);
    const FilteredIdsWithoutDuplicates = getUniqueId(filteredIds?.result);

    const {
        data: products,
        isLoading: getItemsLoading,
        isFetching: getItemsFetching,
    } = useGetItemsQuery((FilteredIdsWithoutDuplicates || productsIdsWithoutDuplicates) ?? [], {
        skip: !ids,
    });

    const productsWithoutDuplicates = getUniqueListBy(products?.result ?? [], "id");
    const filteredLinkedList = filteredIds?.result
        ? splitArrayIntoChunks(productsWithoutDuplicates)
        : [];

    const methods = useForm();

    const onSubmit = (data: Filter) => {
        console.log(data);
        const temp: { [key: string]: string | number } = {};
        (Object.entries(data) as [keyof Filter, string][]).forEach(([key, value]) => {
            if (data[key]) {
                if (key === "price") {
                    temp[key] = +value;
                } else {
                    temp[key] = value;
                }
            }
        });
        getFilteredIds(temp);
    };

    if (getIdsLoading || getItemsLoading || getFieldsLoading) return <Loader />;

    return (
        <div className={s.container}>
            <FormProvider {...methods}>
                <FilterForm onSubmit={onSubmit} />
            </FormProvider>
            <div className={s.content}>
                {getItemsFetching || getIdsFetching ? (
                    <Loader />
                ) : (
                    <ProductsTable
                        products={filteredLinkedList[page - 1] || productsWithoutDuplicates}
                    />
                )}

                <Pagination
                    pageSize={limit}
                    totalCount={
                        FilteredIdsWithoutDuplicates?.length ||
                        paginationIdsWithoutDuplicates?.length
                    }
                    currentPage={page}
                />
            </div>
        </div>
    );
}

export default App;
