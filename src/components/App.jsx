import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SearchBar } from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../fetchImages";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { AppWrapper } from "./App.styled";

export class App extends Component {
  state= {
    searchValue: '',
    largeImgUrl: '',
    images: [],
    isloading: false,
    error: null,
    page: 1,
    showLoadMoreBtn: false,
  }

  async componentDidUpdate(_, prevState) {
  const { searchValue, page } = this.state;
  if (prevState.searchValue !== searchValue || prevState.page !== page) {
    try {
      this.setState({ isloading: true, error: null });
      const data = await fetchImages(searchValue, page);
      if (!data.totalHits) {
        this.setState({ showLoadMoreBtn: false });
         return toast.error('Sorry, there are no images matching your search query. Please try again.', {
            icon: false
          });
      }
      toast(`Hooray! We found ${[data.totalHits]} images.`);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        showLoadMoreBtn: page < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Error' });
    } finally {
      this.setState({ isloading: false });
    }
  }
};



  addName = searchValue => {
    this.setState({ searchValue, page: 1, images: [] });
  };
  setLargeImgUrl = url => {
    this.setState({ largeImgUrl: url });
  };

  onModalClose = () => {
    this.setState({ largeImgUrl: '' });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };



  render() { 
    const { images, error, isloading, largeImgUrl, showLoadMoreBtn } =
    this.state;
  return (
  <AppWrapper>
      <SearchBar onSubmit={this.addName}/>
      {images.length > 0 && (
          <ImageGallery images={images} setLargeImgUrl={this.setLargeImgUrl} />
        )}
        {isloading && <Loader />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {largeImgUrl && <Modal img={largeImgUrl} onClose={this.onModalClose} />}
        {showLoadMoreBtn && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={2000} pauseOnHover closeOnClick/>
  </AppWrapper>
  );
  }
}

