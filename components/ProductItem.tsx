import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { AddProductToWishListProps } from "./AddProductToWishlist";

const AddProductToWishList = dynamic<AddProductToWishListProps>(async () => {
    const { AddProductToWishList } = await import("./AddProductToWishlist");
    return AddProductToWishList;
}, {
    loading: () => <span>Carregando ...</span>
})

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
        priceFormatted: string;
    }
    onAddToWishlist: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Add to wishlist</button>

            {
                isAddingToWishlist && (
                    <AddProductToWishList
                        onAddToWishlist={() => onAddToWishlist(product.id)}
                        onRequestClose={() => setIsAddingToWishlist(false)}
                    />
                )
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
});