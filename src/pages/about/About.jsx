import PageBanner from "../../Components/pageBanner/PageBanner";
import styles from "./about.module.css";
const About = () => {
  return (
    <div className="about_page">
      <PageBanner page={"About"} />
      <div className="about-us-area ">
        <div className="container mx-auto">
          <div className="about-us bg-white p-8 md:p-12 lg:p-16 rounded-md shadow-md">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8">
              <figure className={styles.about_photo}>
                <img
                  src="/imgs/about.png"
                  alt=""
                  className={`${styles.about_img} object-cover w-full h-full rounded-md`}
                />
              </figure>

              <div className={styles.about_brief_container}>
                <div
                  className={`${styles.about_brief} bg-gray-50 p-6 md:p-8 lg:p-10 rounded-md overflow-auto`}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                    About TechnoMatic
                  </h2>
                  <p className="mb-3">
                    At TechnoMatic, we are your premier destination for all your
                    computer part needs. Whether you are a tech enthusiast, a
                    professional, or a trader looking to showcase your products,
                    we have got you covered.
                  </p>

                  <p className="mb-3">
                    Our commitment to excellence extends beyond just selling
                    computer parts. We offer a unique service where you can have
                    your computer parts collected under our expert supervision.
                    We understand the value of your investment, and our trained
                    team ensures that the collection process is seamless,
                    secure, and efficient.
                  </p>

                  <p className="mb-3">
                    For traders in the tech industry, TechnoMatic provides a
                    platform to showcase and sell your products. By partnering
                    with us, you gain access to a wide audience of potential
                    buyers who are actively seeking high-quality computer
                    components. Our user-friendly platform makes it easy for you
                    to post your products and reach customers efficiently.
                  </p>

                  <p className="mb-3">
                    What sets TechnoMatic apart is our dedication to fostering a
                    thriving tech community. We believe in the power of
                    collaboration and knowledge-sharing. Whether you are a
                    seasoned professional or just starting your tech journey,
                    our platform provides a space for enthusiasts to connect,
                    learn, and grow together.
                  </p>

                  <p className="mb-3">
                    Our user-friendly interface ensures a smooth shopping
                    experience, and our customer support team is always ready to
                    assist you with any inquiries or concerns. We prioritize
                    your satisfaction, and we strive to make TechnoMatic your
                    go-to source for all things related to computer parts.
                  </p>

                  <p className="mb-3">
                    Join us on this tech journey, explore our extensive range of
                    products, and experience the convenience of trading on the
                    TechnoMatic platform. Together, let us build and upgrade
                    your tech world!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
