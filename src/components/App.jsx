import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMore from './Button/Button';
import { FetchApi } from '../FetchApi/FetchApi';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import s from './App.module.css';

export default class App extends Component {
  state = {
    hits: null,
    search: '',
    status: 'resolved',
    error: null,
    page: 1,
    gallery: [],
    isModalOpen: false,
    imgUrl: '',
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  hendleFormSubmit = search => {
    if(this.state.search === search || !search.length){
      return 
    }

    this.setState({ search, page: 1, gallery: [] });
  }; 

  closeModal = () => {
    this.setState({ isModalOpen: false, imgUrl: '' });
  };

  onImgClick = (url) => {
    this.setState(() => ({
      imgUrl: url,
      isModalOpen: true,
    }));

  };

  // componentDidMount() {
  //   this.setState({ status: 'pending' });
  //   const query = this.state.search || '';

  //   FetchApi(query, this.state.page)
  //     .then(({ hits }) => {
  //       this.setState({ gallery: hits, status: 'resolved' });
  //     })
  //     .catch(error => this.setState({ error, status: 'rejected' }));
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.setState({ status: 'pending' });
      const query = this.state.search || '';

      FetchApi(query, this.state.page)
        .then(({ hits }) => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { status, imgUrl, isModalOpen, gallery, search } = this.state;

    return (
      <div className={s.app}>
        <Serchbar propSubmit={this.hendleFormSubmit} propSearch={this.state.search}/>
        <ImageGallery>
          {status !== 'rejected' && gallery.length > 0 && (
            <ImageGalleryItem propHits={gallery} onImgClick={this.onImgClick} />
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
          <LoadMore more={this.loadMore} />
        )}

        <ToastContainer autoClose={3000} />

        {isModalOpen && (
          <Modal propModalUrl={imgUrl} propClose={this.closeModal} />
        )}
      </div>
    );
  }
}
