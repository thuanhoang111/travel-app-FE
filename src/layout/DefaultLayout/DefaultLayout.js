import classNames from 'classnames/bind';
import styles from '~/layout/DefaultLayout/DefaultLayout.module.scss';
import Header from '~/pages/Header/Header';
import images from '~/assets/image';
import Footer from './../../component/Footer/Footer';

function DefaultLayout({ children, background }) {
   const cx = classNames.bind(styles);
   return (
      <div className={cx('wrapper')}>
         {background ? <Header background={images.backgroundHeader}></Header> : <Header></Header>}

         {children}
         <footer className={cx('footer-main')}>
            <Footer></Footer>
         </footer>
      </div>
   );
}

export default DefaultLayout;
