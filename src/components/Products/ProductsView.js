import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ProductsView.module.css";
import Pagination from "../Pagination/Pagination";


const POSTS_PER_PAGE = 5;

const ProductsView = () => {


    const [productsMap, setProductsMap] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterParams, setFilterParams] = useState({ name: "", price: "" });
    // const [postsPerPage, setPostsPerPage] = useState(5);

    const nameInputRef = useRef(null);
    const priceInputRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsMapData = new Map();
            const jwtToken = localStorage.getItem("token");
            const response = await fetch("https://junior-test.mntzdevs.com/api/products/",
                {
                    method: 'GET', // or 'POST', 'PUT', etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}` // Include the token here
                    }
                });
            const { products } = await response.json();

            for (let productId of Object.keys(products)) {
                const currentProduct = products[productId];

                // if (productsMapData[productId])) {
                if (productsMapData.get(productId)) {
                    continue;
                }

                const product = {
                    id: productId,
                    name: currentProduct.name,
                    price: currentProduct.price
                };
                productsMapData.set(productId, product);
                // productsMapData[productId] = product;
                if (currentProduct.linkedProducts) {
                    const linkedProducts = [];
                    for (let linkedProductId of Object.keys(currentProduct.linkedProducts)) {
                        const currentLinkedProduct = currentProduct.linkedProducts[linkedProductId];

                        if (productsMapData.get(linkedProductId)) {
                            continue;
                        }

                        const linkedProduct = {
                            id: linkedProductId,
                            name: currentLinkedProduct.name,
                            price: currentLinkedProduct.price
                        };
                        productsMapData.set(linkedProductId, linkedProduct);

                        linkedProducts.push(linkedProductId);
                    }

                    product.linkedProducts = linkedProducts;
                }
            }
            setProductsMap(productsMapData);
            setLoading(false);
        }
        fetchProducts();
    }, []);


    const onFilterChange = e => {
        const filterParam = e.target.id;
        const value = e.target.value;
        // const nameValue = nameInputRef.current.value.trim();
        // const priceValue = priceInputRef.current.value.trim();

        if (filterParam === "name") {
            setFilterParams({ ...filterParams, name: value })
        } else {
            if (!isNaN(value)) {
                setFilterParams({ ...filterParams, price: value });
            }

        }
    }

    const products = Array.from(productsMap.values());
    // console.log(products);
    // console.log(products.slice((currentPage - 1) * 5, (currentPage - 1) * 5 + 5));

    //get Current Posts
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;

    const filteredProducts = useMemo(() => {
        const filtered = [];
        products.forEach(product => {
            if (filterParams.name !== "" && !product.name.toLowerCase().includes(filterParams.name)) {
                return;
            }

            // if (filterParams.price !== "" && product.price !== Number(filterParams.price)) {
            //     return;
            // }
            // console.log(filterParams.price);
            // console.log(String(product.price).includes(filterParams.price));
            // if (filterParams.price !== "" && !String(product.price).includes(filterParams.price)) {
            if (filterParams.price !== "" && !String(product.price).startsWith(filterParams.price)) {
                return;
            }


            filtered.push(product);
        });

        return filtered;
    }, [products, filterParams, currentPage]);
    // console.log(products);
    // const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const currentPosts = filteredProducts.slice(indexOfFirstPost, indexOfLastPost)

    //change page

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className={styles.centralDiv}>
            {!loading ? <div className={styles.mainDiv}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <label for='name'>Name</label>
                    <input type="text" ref={nameInputRef} id="name" value={filterParams.name} onChange={onFilterChange} />
                    <label for='price'>Price</label>
                    {/* <input type="number" ref={priceInputRef} id="price" value={filterParams.price} onChange={onFilterChange} min={1} /> */}
                    <input type="text" ref={priceInputRef} id="price" value={filterParams.price} onChange={onFilterChange} min={1} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((product) => {
                            // return (
                            //     <h2 key={product.id}>
                            //         <table>
                            //             <thead>
                            //                 <tr>
                            //                     <th>ID</th>
                            //                     <th>Name</th>
                            //                     <th>Price</th>
                            //                 </tr>
                            //             </thead>
                            //             <tbody>
                            //                 <tr>
                            //                     <td>{product.id}</td>
                            //                     <td>{product.name}</td>
                            //                     <td>{product.price}</td>
                            //                 </tr>
                            //             </tbody>
                            //         </table>
                            //     </h2>)
                            return (

                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <Pagination className={styles.paginationDiv} postsPerPage={POSTS_PER_PAGE} totalPosts={products.length} paginate={paginate} /> */}
                <Pagination className={styles.paginationDiv} postsPerPage={POSTS_PER_PAGE} totalPosts={filteredProducts.length} paginate={paginate} />
            </div> : <h3>Loading...</h3>}
        </div>

    )
}

export default ProductsView