import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './Pagination.module.css';
export default function Pagination({ pages, currentPage, setCurrentPage }) {
  const pagesArr = [];
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }
  return (
    <div className={`${styles.pagination} flex justify-center items-center`}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`${styles.page} ${styles.previous}`}
      >
        <ArrowBackIcon />
      </button>
      {pagesArr.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          className={
            currentPage === page
              ? styles.page + ' ' + styles.active
              : styles.page
          }
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        disabled={currentPage === pages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`${styles.page} ${styles.previous}`}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
}
Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.number.isRequired,
};
