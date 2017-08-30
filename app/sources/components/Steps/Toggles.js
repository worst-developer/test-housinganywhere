// import components
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

const toggleB1 = 'toggleB1';
const toggleB2 = 'toggleB2';

@connect()
export default class Toggles extends Component {
  
  state = { 
    [toggleB1]: false,
    [toggleB2]: false
  }

  handleToggle = (event, id) => {
    event.preventDefault(event);
    /* challenging thing...😅
    | if one of selectors were selected use first condition
    | else wait unit first toggle would be selected
    */
    this.state[toggleB1] === true || this.state[toggleB2] === true ?
      this.setState({
        [toggleB1]: !this.state.toggleB1,
        [toggleB2]: !this.state.toggleB2
      }, () => this.props.toggle(this.state)) : this.setState({ [id]: !this.state[id] }, () => this.props.toggle(this.state));
    }

  render() {
    return (
      <div className="main">
        <Paper className="box-selectors" zDepth={2}>
          <div className="wrapper">
            <Toggle 
              className="toggle"
              label="B1"
              labelPosition={'right'}
              toggled={this.state[toggleB1]}
              onToggle={e => {this.handleToggle(e, toggleB1)}} 
            />
            <Toggle 
              className="toggle"
              label="B2"
              labelPosition={'right'}
              toggled={this.state[toggleB2]}
              onToggle={e => {this.handleToggle(e, toggleB2)}}
            />
          </div>
        </Paper>
      </div>
    )
  }
}
