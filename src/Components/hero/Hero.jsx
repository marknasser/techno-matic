import styles from "./hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero_container}>
      <div className={styles.hero}>
        <div className={styles.hero_content}>
          <h1>TechnoMatic</h1>
          <p>Tomorrow's Tech, Today's Choices</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
