import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
export default function ImageGalleryItem({ 
  webformatURL,
  tags,
  largeImageURL,
  setLargeImgUrl }) {
  return (
    <GalleryItem className="gallery-item" >
      <GalleryImage 
      src={webformatURL}
      alt={tags} 
      onClick={() => setLargeImgUrl(largeImageURL)}
      />
    </GalleryItem>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  setLargeImgUrl: PropTypes.func.isRequired,
};