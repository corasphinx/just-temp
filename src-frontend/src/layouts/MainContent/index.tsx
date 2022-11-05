// import scss
import "./index.scss";

// import components
import SnakeCard from "../../components/SnakeCard";

const MainContent = () => {
  return (
    <div className="snake-cards-container">
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
      <SnakeCard snakeId="Snake-Eater" snakeTVL={1234} highestBid={123456} />
    </div>
  );
};

export default MainContent;
