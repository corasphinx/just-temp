// import scss
import "./index.scss";

// import prop-types
import PropTypes from "prop-types";

interface SnakeCardProps {
  snakeId: string;
  snakeTVL: number;
  highestBid: number;
}

const SnakeCard = ({ snakeId, snakeTVL, highestBid }: SnakeCardProps) => {
  return (
    <div className="snake-card">
      <div className="snake-card-avatar">Picture of a snake Here</div>
      <div className="snake-card-content">
        <div className="mt-2">{snakeId}</div>
        <div className="mt-2">{snakeTVL}</div>
        <div className="mt-2">{highestBid}</div>
      </div>
    </div>
  );
};

SnakeCard.propTypes = {
  snakeId: PropTypes.string.isRequired,
  snakeTVL: PropTypes.number.isRequired,
  highestBid: PropTypes.number.isRequired,
};

export default SnakeCard;
