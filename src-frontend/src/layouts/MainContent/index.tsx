// import scss
import "./index.scss";

// import types
import { SnakeCardData } from "../../types";

// import redux
import store from "../../store";
import { connect } from "react-redux";

// import components
import SnakeCard from "../../components/SnakeCard";

interface MainContentProps {
  snakeCards: Array<SnakeCardData> | undefined;
}

const MainContent = ({ snakeCards }: MainContentProps) => {
  return (
    <div className="main-content">
      <div className="ms-auto"></div>
      {snakeCards &&
        snakeCards.map((snakeCard) => (
          <SnakeCard key={snakeCard.id} {...snakeCard} />
        ))}
      <div className="me-auto"></div>
    </div>
  );
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  snakeCards: state.snakeCards.cardsData,
});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
