// import prop-types
import PropTypes from "prop-types";

// import types
import { SnakeCardData } from "../../types";

// import redux
import store from "../../store";
import { connect } from "react-redux";

// import scss
import "./index.scss";

// import components
import SnakeCard from "../../components/SnakeCard";

interface MainContentProps {
  snakeCards: Array<SnakeCardData> | undefined;
}

const MainContent = ({ snakeCards }: MainContentProps) => {
  console.log(snakeCards);
  return (
    <div className="snake-cards-container">
      {snakeCards &&
        snakeCards.map((snakeCard) => (
          <SnakeCard key={snakeCard.id} {...snakeCard} />
        ))}
    </div>
  );
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  snakeCards: state.snakeCards.cardsData,
});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
