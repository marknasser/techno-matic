/* eslint-disable react/prop-types */
import style from "./CheckoutCard.module.css";

export default function CheckoutCard(props) {
  const { product } = props;
  console.log(product);
  return (
    <div className={style.card}>
      <figure className={style.product_figure}>
        <img className={style.product_img} src={product.image} alt="" />
      </figure>
      <h2 className={style.product_title}>{product.title}</h2>
      <h3 className={style.product_price}>
        ${product.priceAfterDisc.toFixed(2)}
      </h3>
    </div>
  );
}
