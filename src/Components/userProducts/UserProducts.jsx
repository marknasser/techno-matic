import { productsCol } from "../../config/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const UserProducts = ({ user }) => {
  const [products] = useCollectionData(productsCol);

  const filteredProducts = products?.filter(
    (product) => product.owner === user
  );

  const displayedProducts = filteredProducts?.map((product) => (
    <div key={product.id} className="bg-white p-4 rounded-md shadow-md mb-4">
      <img src={product.image} alt=".." className="mb-2" />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <h4 className=" font-semibold">{product.price}$</h4>
    </div>
  ));

  return (
    <>
      <section className={`container mt-9 p-5`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts}
        </div>
      </section>
    </>
  );
};

export default UserProducts;
