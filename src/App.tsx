import { useEffect } from "react";
import { ProductsListTable } from "./components/ui/table/DescTable/ProductsListTable";
import { useGetIdsMutation, useGetItemsMutation } from "./services/productsApi";
import Loader from "./components/ui/Loader/Loader";
import { deleteDuplicate } from "./utils/deleteDublicates";
import { Pagination } from "./components/ui/pagination";
import { useParams } from "react-router-dom";

function App() {
    const { pageCount } = useParams();
    const [getIds, { isLoading: getIdsLoading }] = useGetIdsMutation();
    const [getItems, { data: product, isLoading: getItemsLoading }] = useGetItemsMutation();

    const head = [
        { title: "Id", key: "id" },
        { title: "Title", key: "title" },
        { title: "Price", key: "price" },
        { title: "Brand", key: "brand" },
    ];

    useEffect(() => {
        if (pageCount) {
            getIds(+pageCount)
                .unwrap()
                .then(res => res.result)
                .then(res => getItems(res))
                .catch(e => {
                    console.error(e);
                });
        }
    }, [getIds, getItems, pageCount]);

    if (!pageCount || getIdsLoading || getItemsLoading) return <Loader />;
    return (
        <div style={{ width: "1280px", margin: "0 auto" }}>
            {product && (
                <ProductsListTable
                    head={head}
                    products={deleteDuplicate(product?.result)}
                />
            )}
            <Pagination currentPage={+pageCount} />
        </div>
    );
}

export default App;
