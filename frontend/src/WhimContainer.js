import { connect } from "react-redux";
import { queryNextQuestion, incrementHighscore } from "./redux/actions";
import Whim from "./Whim";

const mapStateToProps = state => {
  return {
    options: state.options,
    keyword: state.keyword,
    highscore: state.highscore,
    answer: state.answer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNext: () => {
      dispatch(queryNextQuestion());
    },
    onSuccess: () => {
      dispatch(incrementHighscore());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Whim);
