import {
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
    console.log("app");
    const { pageCount } = useParams<{ pageCount: string }>();

    const page = pageCount ? +pageCount : 1;
    const limit = 50;
    const { data: PaginationCount } = useGetPaginationIdsQuery();

    const {
        isLoading: getIdsLoading,
        isFetching: getIdsFetching,
        data: ids,
    } = useGetIdsQuery({ offset: page - 1, limit });

    const [getFilteredIds, { data: filteredIDS }] = useLazyGetFilteredQuery();

    const paginationIdsWithoutDuplicates = getUniqueId(PaginationCount?.result);
    const productsIdsWithoutDuplicates = getUniqueId(ids?.result);
    const FilteredIdsWithoutDuplicates = getUniqueId(filteredIDS?.result);

    const {
        data: products,
        isLoading: getItemsLoading,
        isFetching: getItemsFetching,
    } = useGetItemsQuery((FilteredIdsWithoutDuplicates || productsIdsWithoutDuplicates) ?? [], {
        skip: !ids,
    });

    const productsWithoutDuplicates = getUniqueListBy(products?.result ?? [], "id");
    const filteredLinkedList = filteredIDS?.result
        ? splitArrayIntoChunks(productsWithoutDuplicates)
        : [];

    const methods = useForm();
    // const { reset } = methods;

    const onSubmit = (data: Filter) => {
        const temp: { [key: string]: string } = {};
        (Object.entries(data) as [keyof Filter, string][]).forEach(([key, value]) => {
            if (data[key]) {
                temp[key] = value;
            }
        });
        getFilteredIds(temp);
    };

    if (getIdsLoading || getItemsLoading) return <Loader />;

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
