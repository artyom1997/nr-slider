import cn from "./slider.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useState, useEffect, useRef, Children, cloneElement } from "react";

export default function Slider({ config, children }) {
  const [intervalId, setIntervalId] = useState(null);
  const [remainingBlockCount, setRemainingBlockCount] = useState(
    children.length - config.blockCount
  );
  const [block, setBlock] = useState([]);
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderInnerRef = useRef(null);

  useEffect(() => {
    setBlock(
      Children.map(children, (child) => {
        return cloneElement(child, {
          config,
          sliderInnerRef,
        });
      })
    );
    let carouselDirection = null;
    if (config.direction === "left") {
      carouselDirection = carouselStartLeft;
    } else {
      carouselDirection = carouselStartRight;
    }
    // let id = setInterval(carouselDirection, config.loopTimer);
    // setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const carouselStartRight = () => {
    setSliderPosition((prev) => {
      let newPosition = 0;
      if (
        prev - sliderInnerRef.current.offsetWidth >=
        -(
          (Math.ceil(children.length / config.blockCount) - 1) *
          sliderInnerRef.current.offsetWidth
        )
      ) {
        if (remainingBlockCount <= config.blockCount) {
          newPosition =
            prev -
            (sliderInnerRef.current.offsetWidth / config.blockCount) *
              remainingBlockCount;
          setRemainingBlockCount(children.length - config.blockCount);
        } else {
          newPosition = prev - sliderInnerRef.current.offsetWidth;
          setRemainingBlockCount((prev) => prev - config.blockCount);
        }
      }
      return newPosition;
    });
  };

  const carouselStartLeft = () => {
    setSliderPosition((prev) => {
      let newPosition = 0;
      if (prev === 0) {
        newPosition = -(
          (Math.ceil(children.length / config.blockCount) - 1) *
          sliderInnerRef.current.offsetWidth
        );
        if (children.length % config.blockCount !== 0) {
          newPosition +=  Math.ceil(sliderInnerRef.current.offsetWidth / config.blockCount) *
              (config.blockCount - (children.length % config.blockCount));
        }
      } else {
        if (-prev < sliderInnerRef.current.offsetWidth) {
          newPosition = 0;
        } else newPosition = prev + sliderInnerRef.current.offsetWidth;
      }
      return newPosition;
    });
  };

  const goRight = () => {
    clearInterval(intervalId);
    carouselStartRight();
  };

  const goLeft = () => {
    clearInterval(intervalId);
    carouselStartLeft();
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
          {block}
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
    loopTimer: 2000,
    position: "start",
    direction: "left",
    paginationClickable: false,
  },
};
