import cn from "./slider.module.scss";
import PropTypes from "prop-types";
import createRightMovementType from "../../helpers/createRightMovementType";
import createLeftMovementType from "../../helpers/createLeftMovementType";
import positionMovement from "../../helpers/positionMovement";
import createMovementArgs from "../../helpers/movementArgs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  Children,
  cloneElement,
} from "react";

export default function Slider({ config, children }) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [block, setBlock] = useState([]);
  const sliderInnerRef = useRef(null);

  const goRight = () => {
    setSliderPosition((prev) => {
      const type = createRightMovementType(
        sliderInnerRef.current.offsetWidth,
        config.blockCount,
        children.length,
        prev,
        config.position
      );
      return positionMovement({
        prev,
        ...new createMovementArgs(
          config.position,
          sliderInnerRef.current.offsetWidth,
          type,
          config.blockCount,
          children.length,
          "right"
        ),
      });
    });
    clearInterval(intervalId);
  };

  const goLeft = () => {
    setSliderPosition((prev) => {
      const type = createLeftMovementType(
        sliderInnerRef.current.offsetWidth,
        config.blockCount,
        children.length,
        prev,
        config.position
      );
      return positionMovement({
        prev,
        ...new createMovementArgs(
          config.position,
          sliderInnerRef.current.offsetWidth,
          type,
          config.blockCount,
          children.length,
          "left"
        ),
      });
    });
    clearInterval(intervalId);
  };

  const navLeftStyles = useMemo(() => {
    if (sliderInnerRef?.current?.offsetWidth) {
      if (config.navigationPosition === "center") {
        return {
          left: `${
            (sliderInnerRef.current.offsetWidth / config.blockCount) *
            ((config.blockCount - 1) / 2)
          }px`,
        };
      } else {
        return {
          left: 0,
        };
      }
    }
  }, [sliderInnerRef.current, config]);

  const navRightStyles = useMemo(() => {
    if (sliderInnerRef?.current?.offsetWidth) {
      if (config.navigationPosition === "center") {
        return {
          right: `${
            (sliderInnerRef.current.offsetWidth / config.blockCount) *
            ((config.blockCount - 1) / 2)
          }px`,
        };
      } else {
        return {
          right: 0,
        };
      }
    }
  }, [sliderInnerRef.current, config]);

  useEffect(() => {
    setBlock(
      Children.map(children, (child) => {
        return cloneElement(child, {
          config,
          sliderInnerRef,
        });
      })
    );
  }, [config,children]);

  useEffect(() => {
    setSliderPosition((prev) =>
      positionMovement({
        prev,
        ...new createMovementArgs(
          config.position,
          sliderInnerRef.current.offsetWidth,
          "start",
          config.blockCount,
          children.length,
          config.direction
        ),
      })
    );
  }, [config,children]);

  useEffect(() => {
    if (config.autoplay) {
      const autoplayDiraction = {
        right: goRight,
        left: goLeft,
      };
      const id = setInterval(
        autoplayDiraction[config.direction],
        config.loopTimer
      );
      setIntervalId(id);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [config]);

  return (
    <div className={cn.slider}>
      <div style={navLeftStyles} className={cn.navigation} onClick={goLeft}>
        <FaChevronLeft />
      </div>
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
      <div style={navRightStyles} className={cn.navigation} onClick={goRight}>
        <FaChevronRight />
      </div>
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
    navigationPosition: "space-between",
    pagination: false,
    loopTimer: 2000,
    position: "start",
    direction: "left",
    paginationClickable: false,
  },
};
