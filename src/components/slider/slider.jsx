import cn from "./slider.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";

export default function Slider({ config, children }) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderInnerRef = useRef(null);

  useEffect(() => {
    setInterval(goRight,2000)
      return () => {
          clearInterval()
      }
  }, []);

   


  const goRight = () => {
    setSliderPosition((prev) => {
        let newPosition = 0
        if(prev - sliderInnerRef.current.offsetWidth >= -((children.length-1) * sliderInnerRef.current.offsetWidth)){
            newPosition = prev - sliderInnerRef.current.offsetWidth
        }
      return newPosition;
    });
  };

  const goLeft = () => {
    setSliderPosition((prev) => {
        let newPosition = Math.min(prev + sliderInnerRef.current.offsetWidth,0) ;  
        return newPosition;
      });
  };

  return (
    <div className={cn.slider}>
      <div className={cn.navigation} onClick={goLeft}></div>
      <div className={cn.window}>
        <div
          ref={sliderInnerRef}
          style={{
            transform: `translateX(${sliderPosition}px)`,
          }}
          className={cn.sliderInner}
        >
          {children}
        </div>
      </div>

      <div
        className={classNames(cn.navigation, cn.right)}
        onClick={goRight}
      ></div>
    </div>
  );
}

Slider.propTypes = {
  config: PropTypes.object,
};

Slider.defaultProps = {
  config: {
    autoplay: true,
    blockCount: 1,
    navigation: false,
    pagination: false,
    loopTimer: 1000,
    position: "start",
    direction: "left",
    paginationClickable: false,
  },
};
