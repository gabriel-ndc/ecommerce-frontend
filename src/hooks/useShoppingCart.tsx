import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";

export interface Product {
    id: number;
    name: string;
    unitPrice: number;
    quantity: number;
}

interface ShoppingCart {
    products: Product[],
    addToCart: (product: Product) => void,
    removeFromCart: (name: string) => void,
    checkout: () => Promise<CheckoutResponse>
    clearCart: () => void,
    totalPrice: number
}

interface CheckoutResponse {
    id: number;
    status: 'SUCCESS' | 'FAILURE';
}

const ShoppingCartContext = createContext({} as ShoppingCart);

type Props = {
    children: ReactNode
}

export function ShoppingCartProvider({children}: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    function addToCart(product: Product) {
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            setProducts(currentProducts => currentProducts.map((p, i) => {
                if (i === index) {
                    return {
                        ...p,
                        quantity: p.quantity + product.quantity
                    }
                } else {
                    return p
                }
            }))
        } else {
            setProducts(currentProducts => [...currentProducts, product]);
        }
    }

    function removeFromCart(name: string) {
        setProducts(currentProducts => 
            currentProducts.filter(product => product.name !== name)
        )
    }

    async function checkout(): Promise<CheckoutResponse> {
        const productRequestDTO = {
            "productOrders": products.map(p => ({
                product: { id: p.id },
                quantity: p.quantity
            }))
        }
        const response = await axiosInstance.post<CheckoutResponse>("/orders", productRequestDTO);
        const data = await response.data;
        return data;
    }

    function clearCart() {
        setProducts([]);
    }

    useEffect(() => {
        setTotalPrice(products.reduce((acc, product) => 
            acc + product.quantity*product.unitPrice, 0))
    }, [products])

    return (
        <ShoppingCartContext.Provider value={{
            products,
            addToCart,
            removeFromCart,
            checkout,
            clearCart,
            totalPrice
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
} 


export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}