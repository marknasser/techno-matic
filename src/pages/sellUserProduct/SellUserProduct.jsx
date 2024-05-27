/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import PageBanner from "../../Components/pageBanner/PageBanner";
import { productsCol } from "../../config/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import styles from "./sellUserProducts.module.css";

import datta from "../../../public/computer_parts-data.json";
import { useEffect } from "react";

const SellUserProduct = () => {
  const { handleSubmit, register, control, formState, reset } = useForm({
    mode: "onChange",
  });
  const [products] = useCollectionData(productsCol);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { isValid, errors } = formState;

  const onSubmit = async (data) => {
    try {
      await addDoc(productsCol, {
        ...data,
        owner: currentUser?._id,
        // id: products.length + 1,
      });

      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <PageBanner page={"Sell your product"} />
      <section className={`container ${styles.sec_container}`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.userSell_from}
        >
          <div className={styles.input_warper}>
            <label className={errors.title && styles.errorLabel}>Title</label>
            <input {...register("title", { required: true })} />
          </div>
          <div className={styles.input_warper}>
            <label className={errors.price && styles.errorLabel}>Price</label>
            <input type="number" {...register("price", { required: true })} />
            <span>$</span>
          </div>
          <div className={styles.input_warper}>
            <label className={errors.color && styles.errorLabel}>Color</label>
            <input {...register("color", { required: true })} />
          </div>
          <div className={styles.input_warper}>
            <label className={errors.image && styles.errorLabel}>
              Image URL
            </label>
            <input {...register("image", { required: true })} />
          </div>
          <div className={styles.select_warper}>
            <label className={errors.type && styles.errorLabel}>Type</label>
            <select {...register("category", { required: true })}>
              <option value="case">Case</option>
              <option value="cpu">CPU</option>
              <option value="internal-hard-drive">Internal Hard Drive</option>
              <option value="keyboard">Keyboard</option>
              <option value="memory">Memory</option>
              <option value="monitor">Monitor</option>
              <option value="motherboard">Motherboard</option>
              <option value="mouse">Mouse</option>
              <option value="power-supply">Power Supply</option>
              <option value="speaker">Speaker</option>
              <option value="gpu">GPU</option>
              <option value="fan">Fan</option>
            </select>
          </div>
          <div className={styles.select_warper}>
            <label className={errors.condition && styles.errorLabel}>
              Condition
            </label>
            <select {...register("state", { required: true })}>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className={styles.textarea_warper}>
            <label className={errors.description && styles.errorLabel}>
              Description
            </label>
            <textarea {...register("userDescription", { required: true })} />
          </div>
          <button type="submit">Create</button>
        </form>
      </section>
    </>
  );
};

export default SellUserProduct;
