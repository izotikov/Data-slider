import React, {FC, useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/scss';
import type { Swiper as SwiperType } from 'swiper';
import './Slider.scss';
import {SliderDataElementsType} from "@type/slider";
import SliderElem from "@components/SliderElem/SliderElem";
import ArrowButton from "@components/ArrowButton/ArrowButton";
import {gsap} from "gsap";
import useResize from "../../hooks/useResize";

interface SliderProps {
  dataArray: SliderDataElementsType[];
}

interface currentSlideStatusProps {
  isBeginning: boolean;
  isEnd: boolean;
}

const Slider: FC<SliderProps> = ({dataArray}) => {

  const swiperRef = useRef<SwiperType | null>(null);
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentSlidesStatus, setCurrentSlidesStatus] = useState<currentSlideStatusProps>(
    {isBeginning: true, isEnd: false});

  const [internalData, setInternalData] = useState<SliderDataElementsType[]>(dataArray);

  const {isMobile} = useResize();

  const previousSlide = () => {
    swiperRef.current?.slidePrev();
    if (swiperRef.current) {
      setCurrentSlidesStatus({
        isBeginning: swiperRef.current.isBeginning,
        isEnd: swiperRef.current.isEnd
      });

    }
  }

  const nextSlide = () => {
    swiperRef.current?.slideNext();
    if (swiperRef.current) {
      setCurrentSlidesStatus({
        isBeginning: swiperRef.current.isBeginning,
        isEnd: swiperRef.current.isEnd
      });
    }
  }

  useEffect(() => {
    if (!sliderWrapperRef.current) return;

    gsap.to(sliderWrapperRef.current, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        setInternalData(dataArray);

        setTimeout(() => {
          gsap.fromTo(sliderWrapperRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6 }
          );
        }, 50);
      }
    });

  }, [dataArray]);

  return (
    <div className='slider-wrapper' ref={sliderWrapperRef}>
      {!currentSlidesStatus.isBeginning && (
        <ArrowButton className='slider-wrapper__arrow-button__prev' onClick={previousSlide} variant="left" color='#3877EE'></ArrowButton>
      )}
      <Swiper
        slidesPerView={isMobile ? 1.5 : 3.1}
        slidesOffsetBefore={isMobile ? 20 : 80}
        className='swiper__custom-classes'
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSliderMove={(swiper) => setCurrentSlidesStatus({isBeginning: swiper.isBeginning, isEnd:swiper.isEnd})}
      >
        {internalData.map((data, index) => (
          <SwiperSlide key={index}>
            <SliderElem header={data.header} description={data.description}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {!currentSlidesStatus.isEnd && (
        <ArrowButton className='slider-wrapper__arrow-button__next' onClick={nextSlide} variant="right" color='#3877EE'></ArrowButton>
      )}
    </div>


  );
};

export default Slider;