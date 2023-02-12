import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
export default function ImageGallery({ images, setLargeImgUrl }) {
  return (
    <Gallery className="gallery">
      {images.map(({ id, webformatURL, tags, largeImageURL })=> (
        <ImageGalleryItem key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        setLargeImgUrl={setLargeImgUrl} />
      ))}
    </Gallery>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setLargeImgUrl: PropTypes.func.isRequired,
};