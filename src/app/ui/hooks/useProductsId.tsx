import { create, } from 'zustand';
import { persist } from 'zustand/middleware';
interface StringArrayState {
    products: string[];
    addProductId: (str: string) => void;
    removeProductId: (index: number) => void;
    setProductIds: (newStrings: string[]) => void;
}
const useProductsId = create<StringArrayState>()(
    persist(
        (set) => ({
            products: [],
            addProductId: (str: string) => set((state) => ({ products: [...state.products, str] })),
            removeProductId: (index: number) => set((state) => ({
                products: state.products.filter((_, i) => i !== index)
            })),
            setProductIds: (newStrings: string[]) => set({ products: newStrings }),
        }),
        {
            name: 'products',
        }
    )
);

export default useProductsId;