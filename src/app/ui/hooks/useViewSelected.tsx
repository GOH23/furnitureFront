import { create, } from 'zustand';
import { persist } from 'zustand/middleware';
export type ViewSelected = "view1" | "view2"
interface ViewSelectedState {
    viewSelected?: ViewSelected;
    setViewSelected: (str: ViewSelected) => void;
}
const useViewSelected = create<ViewSelectedState>()(
    persist(
        (set) => ({
            viewSelected: undefined,
            setViewSelected: (str: ViewSelected) => set((state) => ({ viewSelected: str })),
        }),
        {
            name: 'viewSelected',
        }
    )
);

export default useViewSelected;