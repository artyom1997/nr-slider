import { useEffect, useState } from "react";
import cn from "./slide.module.scss";

export default function Slide({ children, config, sliderInnerRef }) {
  const [slideBlockStyle, setSlideBlockStyle] = useState({});

  useEffect(() => {
    setSlideBlockStyle(createSlideBlockStyle());
  }, []);

  const createSlideBlockStyle = () => {
    let styleBlock = {};
    styleBlock.width = `${
      sliderInnerRef.current.offsetWidth / config.blockCount - 10
    }px`;
    styleBlock.margin = "0 5px";
    return styleBlock;
  };
  return (
    <div style={slideBlockStyle} className={cn.slide}>
      {children}
    </div>
  );
}
