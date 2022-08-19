import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMore from './Button/Button';
import { FetchApi } from '../FetchApi/FetchApi';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import '../index.css'

import s from './App.module.css';


 const App = () => {

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('resolved');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');


  const loadMore = () => {
    setPage(prevState =>   prevState + 1 );
  };

  const hendleFormSubmit = searchTerm => {
    if(search === searchTerm || !searchTerm.length){
      return 
    }
    setSearch(searchTerm);
    setPage(1);
    setGallery([]);
  }; 

  const closeModal = () => {
    setIsModalOpen(false);
    setImgUrl('')
  };

  const onImgClick = (url) => {
    setImgUrl(url);
    setIsModalOpen( true );

  };

  useEffect(() => {
    if( search === '' && page === 1) return;
    setStatus('pending')  
    const query = search || '';

    FetchApi(query, page)
        .then(({ hits }) => {
          setGallery(prevState => [...prevState, ...hits]);
          setStatus('resolved')
        })
        .catch(() => setStatus('rejected'));

  },[page, search] )

    return (
      <div className={s.app}>
        <Serchbar propSubmit={hendleFormSubmit} propSearch={search}/>
        <ImageGallery>
          {status !== 'rejected' && gallery.length > 0 && (
            <ImageGalleryItem propHits={gallery} onImgClick={onImgClick} />
          )}

          {status === 'pending' && <Loader />}

          {status === 'rejected' && (
            <div className={s.noImg}>Error please try again later</div>
          )}
        </ImageGallery>

        {gallery.length === 0 && search !== '' && status !== 'pending' && (
          <div className={s.noImg}>There are no images for your request..</div>
        )}

        {search !== '' && gallery.length !== 0 && gallery.length >= 12 && (
          <LoadMore more={loadMore} />
        )}

        <ToastContainer autoClose={3000} />

        {isModalOpen && (
          <Modal propModalUrl={imgUrl} propClose={closeModal} />
        )}
      </div>
    );
}

export default App;