/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import style from '~/layout/Detail/Detail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCartShopping,
   faHeart,
   faTicket,
   faCalendarDays,
   faPhone,
   faMailForward,
} from '@fortawesome/free-solid-svg-icons';
import ImageDetail from '~/component/ImageDetail/ImageDetail';
import { Row, Col } from 'antd';
import PointOfLocation from '~/component/PointOfLocation/PointOfLocation';
import TravelingSchedule from '~/component/TravelingSchedule/TravelingSchedule';
import CostTable from '~/component/CostTable/CostTable';
import * as GetTour from '~/service/GetTour';
import { useEffect, useState } from 'react';
import TourCard from '~/component/TourCard/TourCard.js';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const cx = classNames.bind(style);

function Detail() {
   const [listTour, setListTour] = useState([]);
   const [tourSelected, setTourSelected] = useState();

   const getTourById = async (tourId) => {
      await GetTour.search('/tours/info', tourId)
         .then((data) => {
            setTourSelected(data);
         })
         .catch((error) => console.log(error));
   };

   const fetchApi = async () => {
      await GetTour.search('tours/toptours', 4)
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   const { tourId } = useParams();
   useEffect(() => {
      getTourById(tourId);
      fetchApi();
   }, []);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrap-mark')}>
            <FontAwesomeIcon className={cx('icon')} icon={faTicket}></FontAwesomeIcon>
            <label htmlFor="ticket" className={cx('wrap-mark-title')}>
               {tourSelected && tourSelected.id}
            </label>
         </div>
         <div className={cx('content-header')}>
            <div className={cx('content-header-1')}>
               <h1 className={cx('title')}>{tourSelected && tourSelected.name}</h1>
               <div className={cx('short-rating')}>
                  <span className={cx('tour-rating')}>9.4</span>
                  <div className={cx('s-comment')}>
                     <h4>Tuy???t v???i</h4>
                     <p>{tourSelected && tourSelected.liked} quan t??m</p>
                  </div>
                  <div className={cx('s-wishlist')}>
                     <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: '#fd5056', marginRight: '2px' }}
                        size="2x"
                     ></FontAwesomeIcon>
                     <label>{tourSelected && tourSelected.liked}</label>
                  </div>
               </div>
            </div>
            <div className={cx('content-header-2')}>
               <div className={cx('group-price')}>
                  <p>
                     Gi??
                     <span className={cx('line-thought')}>{tourSelected && tourSelected.price.toLocaleString()}???</span>/
                     kh??ch
                  </p>
                  <p>
                     <span className={cx('current-price')}>
                        {' '}
                        {tourSelected
                           ? (tourSelected.price * (1 - tourSelected.discount)).toLocaleString()
                           : tourSelected && tourSelected.price.toLocaleString()}
                        ???
                     </span>
                     / kh??ch
                  </p>
               </div>
               <div className={cx('group-add-cart')}>
                  <a href="/addCart">
                     <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                     <label>?????t ngay</label>
                  </a>
                  <a href="/addCart">
                     <label>Li??n h??? t??? v???n</label>
                  </a>
               </div>
            </div>
         </div>
         <div className={cx('list-image')}>
            <ImageDetail></ImageDetail>
         </div>
         <Row>
            <Col span={10} className={cx('time')}>
               <div className={cx('box-order')}>
                  <div>
                     <p>
                        Kh???i h??nh <b>{tourSelected && format(new Date(tourSelected.startday), 'dd/MM/yyyy')}</b>
                     </p>
                     <p>
                        Th???i gian <b>{tourSelected && tourSelected.numberofday} ng??y</b>
                     </p>
                     <p>
                        N??i kh???i h??nh <b>{tourSelected && tourSelected.departure}</b>
                     </p>
                     <p>
                        S??? ch??? c??n nh???n <b>{tourSelected && tourSelected.numberofpeople - tourSelected.subcriber}</b>
                     </p>
                  </div>
                  <div className={cx('calendar')}>
                     <div className={cx('calendar-box')}>
                        <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
                        <label>ng??y kh??c</label>
                     </div>
                  </div>
               </div>
               <div className={cx('box-support')}>
                  <label>Qu?? kh??ch c???n h??? tr????</label>
                  <div className={cx('group-contact')}>
                     <div className={cx('phone', 'contact-box')}>
                        <FontAwesomeIcon icon={faPhone} size="2x"></FontAwesomeIcon>
                        <p>
                           G???i mi???n ph?? <br />
                           qua internet
                        </p>
                     </div>
                     <div className={cx('mail', 'contact-box')}>
                        <FontAwesomeIcon icon={faMailForward} size="2x"></FontAwesomeIcon>
                        <p>
                           G???i y??u c???u <br />
                           h??? tr??? ngay
                        </p>
                     </div>
                  </div>
               </div>
            </Col>
            <Col span={14}>
               <div className={cx('group-services')}>
                  <div className={cx('item')}>
                     <i className="bi bi-flag fa-2x"></i>
                     <label>Th???i gian</label>
                     <p>
                        {tourSelected && tourSelected.numberofday} ng??y {tourSelected && tourSelected.numberofday - 1}
                        ????m
                     </p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-bus-front-fill fa-2x"></i>
                     <label>Ph????ng ti???n di chuy???n</label>
                     <p>{tourSelected && tourSelected.transport}</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-map fa-2x"></i>
                     <label>??i???m tham quan</label>
                     <p>C???n Th??, C?? Mau, B???c Li??u, S??c Tr??ng</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-fire fa-2x"></i>
                     <label>???m th???c</label>
                     <p>Buffet s??ng, Theo th???c ????n, ?????c s???n ?????a ph????ng</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-building fa-2x"></i>
                     <label>Kh??ch s???n</label>
                     <p>kh??ch s???n {tourSelected && tourSelected.starhotel} sao</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-clock fa-2x"></i>
                     <label>Th???i gian l?? t?????ng</label>
                     <p>Quanh n??m</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-people fa-2x"></i>
                     <label>?????i t?????ng th??ch h???p</label>
                     <p>Gia ????nh nhi???u th??? h???</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-stars fa-2x"></i>
                     <label>??u ????i</label>
                     <p>???? bao g???m ??u ????i trong gi?? tour</p>
                  </div>
               </div>
            </Col>
         </Row>
         <PointOfLocation title={'Nh???ng ?????a ??i???m tham quan'} num={5}></PointOfLocation>
         {tourSelected && (
            <TravelingSchedule data={tourSelected.itineraryDetail} startDay={tourSelected.startday}></TravelingSchedule>
         )}
         <Row>
            <Col span={16}>
               <div>
                  <h2>Gi?? tour & ph??? thu ph??ng ????n</h2>
                  {tourSelected && <CostTable price={tourSelected.price}></CostTable>}
               </div>
            </Col>
            <Col span={8}>
               <div>
                  <h2>Th??ng tin h?????ng d???n vi??n</h2>
                  <div className={cx('infor-tour-guide')}>
                     <div className={cx('infor-tour-guide-item')}>
                        <span>HDV d???n ??o??n</span>
                        <p>{tourSelected && tourSelected.tourGuide.name}</p>
                     </div>
                     <div className={cx('infor-tour-guide-item')}>
                        <span>HDV ti???n</span>
                        <p>??ang c???p nh???t</p>
                     </div>
                  </div>
               </div>
            </Col>
         </Row>
         <div className={cx('suggest-tour')}>
            <TourCard
               title="C?? th??? Qu?? kh??ch s??? th??ch"
               className={'title-center'}
               isSmall={true}
               shortenCard={true}
               data={listTour}
            ></TourCard>
         </div>
      </div>
   );
}

export default Detail;
