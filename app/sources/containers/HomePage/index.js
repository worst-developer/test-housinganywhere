import { push } from "react-router-redux";
import { SELECT } from './constants';
import selectAction from './actions';

import Checkbox from 'material-ui/Checkbox';

import Toggles from '../../components/Steps/Toggles';
import Checkboxes from '../../components/Steps/Checkboxes';
import Toggle from 'material-ui/Toggle';


@connect()
export default class HomePage extends Component {

  state = {
    page: 0
  }

  handleSelector = (Id, value) => value === true ? 
    this.setState({ page: this.state.page + 1, [Id]: value }) : ({}) 

  redirect = () => {
    this.props.dispatch(selectAction(this.state));
    this.props.dispatch(push('/blank'), { selectYear: this.state.selectYear, selectCoach: this.state.selectCoach });
  }

  nextStep = () => {
    switch(this.state.page) {
      case 0:
        return <Checkboxes 
          checkbox={(checkboxId, value) => {
            this.handleSelector(checkboxId, value);
          }}
        />
      case 1: 
        return <Toggles 
          toggle={(toggleId, value) => {
            this.handleSelector(toggleId, value);
          }}
        />
      default: 
        console.log('page is not provided')
        break;
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
       {this.nextStep()}
      </div>
    );
  }
}
