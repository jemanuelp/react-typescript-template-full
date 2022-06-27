import { useState } from 'react';
import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import img1 from '../../../../src/assets/images/banner/banner-11.jpg';
import img2 from '../../../../src/assets/images/banner/banner-12.jpg';
import img3 from '../../../../src/assets/images/banner/banner-13.jpg';
import img4 from '../../../../src/assets/images/banner/banner-14.jpg';
import img5 from '../../../../src/assets/images/banner/banner-15.jpg';
import {useRTLInterface} from '../../../utility/hooks/useRTL';
import {SwiperOptions} from 'swiper/types/swiper-options';
import {Swiper as SwiperClass} from 'swiper/types';

SwiperCore.use([Thumbs]);

const SwiperGallery = ({ isRtl }: Partial<useRTLInterface>) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const params = {
    className: 'swiper-gallery',
    spaceBetween: 10,
    navigation: true,
    pagination: {
      clickable: true,
    },
    thumbs: { swiper: thumbsSwiper },
  };

  const paramsThumbs: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Gallery</CardTitle>
      </CardHeader>
      <CardBody>
        <div className='swiper-gallery'>
          <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
            <SwiperSlide>
              <img src={img1} alt='swiper 1' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt='swiper 2' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt='swiper 3' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img4} alt='swiper 4' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img5} alt='swiper 5' className='img-fluid' />
            </SwiperSlide>
          </Swiper>
          <Swiper {...paramsThumbs} className='gallery-thumbs' onSwiper={setThumbsSwiper}>
            <SwiperSlide>
              <img src={img1} alt='swiper 1' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt='swiper 2' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt='swiper 3' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img4} alt='swiper 4' className='img-fluid' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img5} alt='swiper 5' className='img-fluid' />
            </SwiperSlide>
          </Swiper>
        </div>
      </CardBody>
    </Card>
  );
};

export default SwiperGallery;
