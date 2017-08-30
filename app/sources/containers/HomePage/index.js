import { push } from "react-router-redux";
import { SELECT } from './constants';
import { submit } from './actions';

import Toggles from '../../components/Steps/Toggles';
import Checkboxes from '../../components/Steps/Checkboxes';
import Input from '../../components/Steps/Input';
import Select from '../../components/Steps/Select';

import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = (state) => state.check

@connect(mapStateToProps)
export default class HomePage extends Component {

  state = {
    page: 0
  }

  handleSelector = (Id, value) => value === true  ? 
    this.setState({ page: this.state.page + 1, [Id]: value }) : ({}) 

  handleSend = () => {
    const data = {
      a: new Array(this.state.checkedA1 === true ? 'A1' : 'A2'),     
      b: this.state.selectors.toggleB1 === true ? 'B1' : 'B2',
      text: this.state.input,
      c: this.state.select
    }
    this.props.dispatch(submit(data));
  }
  // timeouts added only for better UX
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
          toggle={(selectors) => {
            this.setState({ selectors });
            setTimeout(() => {
              this.setState({ page: 2}); 
            }, 1500);
          }}
        />
      case 2: 
        return <Input 
          handleInput={(value) => {this.setState({ input: value })}}
          handleNextStep={() => {setTimeout(() => {
            this.setState({ page: 3})
          }, 1500)}}
        />
      case 3: 
        return <Select 
          handlePost={() => this.handleSend()}
          handleSelect={(selector, value) => this.setState({ 
            [selector]: value
          })}
        />
      default: 
        console.warn('page is not provided')
        break;
    }
  }

  render() {
    return (
      <div>
        {this.nextStep()}
      </div>
    );
  }
}
