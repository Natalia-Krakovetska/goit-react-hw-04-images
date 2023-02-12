import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SearchBar } from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../fetchImages";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { AppWrapper } from "./App.styled";



export const App =()=> {
const [searchValue, setSearchValue] = useState("");
const [largeImgUrl, setLargeImgUrl] = useState("");
const [images, setImages] = useState([]);
const [isloading, setIsloading] = useState(false);
const [error, setError] = useState(null);
const [page, setPage] = useState(1);
const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

const addName = searchValue => {
  setSearchValue(searchValue);
  setPage(1);
  setImages([]); 
};

const LargeImgUrl = url => {
  setLargeImgUrl(url);
};

const onModalClose = () => {
  setLargeImgUrl("");
};

const loadMore = () => {
  setPage(prevPage => prevPage + 1);
};


useEffect(() => {
  if (searchValue === '') {
    return;
  }
  async function fetchImage() {
    try {
      setIsloading(true);
      setError(null);
      const data = await fetchImages(searchValue, page);
      if (!data.totalHits) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setShowLoadMoreBtn(page < Math.ceil(data.totalHits / 12));

        if (page === 1) {
          toast.success(`Hooray! We found ${[data.totalHits]} images.`);
        }
      }
    } catch (error) {
      setError('Error');
    } finally {
      setIsloading(false);
    }
  }
  fetchImage();
}, [searchValue, page]);

return (
  <AppWrapper>
      <SearchBar onSubmit={addName}/>
      {images.length > 0 && (
          <ImageGallery images={images} setLargeImgUrl={LargeImgUrl} />
        )}
        {isloading && <Loader />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {largeImgUrl && <Modal img={largeImgUrl} onClose={onModalClose} />}
        {showLoadMoreBtn && <Button onClick={loadMore} />}
        <ToastContainer autoClose={2000} pauseOnHover closeOnClick/>
  </AppWrapper>
  );

}