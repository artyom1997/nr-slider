import "./App.css";
import Slide from "./components/slide/slide";
import Slider from "./components/slider/slider";

const config = {
  autoplay: true,
  blockCount: 3,
  navigation: true,
  navigationPosition: "space-between",
  pagination: true,
  loopTimer: 500,
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

       

      </Slider>
    </div>
  );
}

export default App;
