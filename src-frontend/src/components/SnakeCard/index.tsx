// import scss
import "./index.scss";

// import prop-types
import PropTypes from "prop-types";

// import types
import { SnakeCardData } from "../../types";

// import utils
import { getHighestBid, getSnakeTVL } from "../../utils/snakeCards";

const SnakeCard = ({ id, stage, bids }: SnakeCardData) => {
  return (
    <div className="snake-card">
      <div className="snake-card-avatar">Picture of a snake Here</div>
      <div className="snake-card-content">
        <div className="mt-2">{id}</div>
        <div className="mt-2">{getSnakeTVL(bids)}</div>
        <div className="mt-2">{getHighestBid(bids)}</div>
      </div>
    </div>
  );
};

// prop-types
SnakeCard.propTypes = {
  id: PropTypes.string.isRequired,
  stage: PropTypes.number.isRequired,
  bids: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SnakeCard;
