/* eslint-disable react/prop-types */
import style from "./PageBanner.module.css";

export default function PageBanner({ page }) {
  return (
    <div className={style.page_banner}>
      <div className={style.container}>
        <h1 className={style.banner_title}>{page}</h1>
      </div>
      <div className={style.page_path}>
        <span>Home</span>
        <span>/</span>
        <span>{page}</span>
      </div>
    </div>
  );
}
