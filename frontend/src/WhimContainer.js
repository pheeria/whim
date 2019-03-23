import { connect } from "react-redux";
import { queryNextQuestion } from "./redux/actions";
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Whim);

// const fromServer = {
//   options: [
//     "https://images.unsplash.com/photo-1520548568350-fab9b9ebc923?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ",
//     "https://images.unsplash.com/photo-1503467262827-9c70e78ac329?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ",
//     "https://images.unsplash.com/photo-1522726832281-362409683a2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ",
//     "https://images.unsplash.com/photo-1548777123-b54e9310e1bf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ"
//   ],
//   keyword: "far",
//   answer: 0
// };
