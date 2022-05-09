import "./App.css";
import Slide from "./components/slide/slide";
import Slider from "./components/slider/slider";

const config = {
  autoplay: true,
  blockCount: 1,
  navigation: true,
  navigationPosition: "space-between",
  pagination: true,
  loopTimer: 2000,
  position: "start",
  direction: "right",
  paginationClickable: true,
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
