
import styles from "@/app/products/[handle]/product-page.module.css";
export default function VariantsBtn({variants}:any){
  
  return(
    <div className={styles.btnDiv}>
      {variants.map((variant:any)=><button className={styles.button} key={variant.id}>{variant.title}</button>)}
    </div>

  );
}