import Hero from "../../Components/hero/Hero";
import style from "./Home.module.css";
import HomeSlider from "../../Components/homeSlider/HomeSlider";
import HomeListing from "../../Components/homeListing/HomeListing";

export default function Home() {
  return (
    <section id="home" className={style.home}>
      <Hero />
      <HomeSlider />
      <HomeListing />
    </section>
  );
}
