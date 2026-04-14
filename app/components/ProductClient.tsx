"use client";

import { useState } from "react";
import QuantityBtn from "@/app/components/QuantityBtn";
import SpecialInstruction from "@/app/components/SpecialInstructions";
import AddToCartButton from "@/app/components/cart/AddToCartButton";
import styles from "@/app/products/[handle]/product-page.module.css";

export default function ProductClient({ variantId }: { variantId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
 
  return (
    <>
      <SpecialInstruction note={note} setNote={setNote} />

      <div className={styles.quantityAndCart}>
        <QuantityBtn quantity={quantity} setQuantity={setQuantity} />

        <AddToCartButton
          variantId={variantId}
          quantity={quantity}
          note={note}
        />
      </div>
    </>
  );
}