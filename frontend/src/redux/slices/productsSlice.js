import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";import products from "../../../../backend/data/products";
;

// Asynce thunk to fetch products by collcetion and optional filters
export const fetchProductsByFilters = createAsyncThunk("products/fetchbyFilters", async ({
    collection,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    limit,
}) => {
    const query = new URLSearchParams();
    if(collection) query.append("collection", collection);
    if(minPrice) query.append("minPrice", minPrice);
    if(maxPrice) query.append("maxPrice", maxPrice);
    if(sortBy) query.append("sortBy", sortBy);
    if(search) query.append("search", search);
    if(category) query.append("category", category);
    if(limit) query.append("limit", limit);

    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
}
);

// Async thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails", async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
});

// Async thunk to fetch similar produtcs
export const updateProduct = createAsyncThunk("products/updateProduct", async ({id, productData}) => {
    const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")},`
            },
        }
    );
    return response.data;
});

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts",
    async ({id}) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
        );
        return response.data;
    }

)

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selelctedProduct: null, // store the details of the single product
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            collection: "",
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload};
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                collection: "",
            }
        }
    },
    extraReducers: (builder) => {
        builder
        // handle fethcing products with filters
        .addCase(fetchProductsByFilters.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
            state.loading = false;
            state.products = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductsByFilters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // Handle a fetching single product details
        .addCase(fetchProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.selelctedProduct = action.payload; 
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //Handle updating product
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProduct = action.payload;
            const index = state.products.findIndex(
                (product) => product._id === updateProduct._id
            );
            if(index !== -1) {
                state.products[index] = updatedProduct;
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // similar products
        .addCase(fetchSimilarProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchSimilarProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {setFilters, clearFilters} = productSlice.actions;
export default productSlice.reducer;