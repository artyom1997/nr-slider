import "./App.css";
import Slide from "./components/slide/slide";
import Slider from "./components/slider/slider";

const config = {
  autoplay: true, // true || false
  blockCount: 2, // 1 - children.length
  navigation: true, // true || false
  navigationPosition: "space-between", // center || space-between
  pagination: true, // true || false
  loopTimer: 2000,
  position: "start", // start || center
  direction: "right", // right || left
  paginationClickable: true, // true || false
};

function App() {
  return (
    <div className="App">
      <Slider config={config}>
        <Slide>1</Slide>
        <Slide>2</Slide>
        <Slide>3</Slide>
        <Slide>4</Slide>
        <Slide>5</Slide>
        <Slide>6</Slide>
        <Slide>7</Slide>
        <Slide>8</Slide>
        <Slide>9</Slide>
        <Slide>10</Slide>
        <Slide>11</Slide>
      </Slider>
    </div>
  );
}

export default App;
