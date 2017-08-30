// import components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import actionCheck from '../../containers/HomePage/actions'

const mapStateToProps = (state) => state.check

@connect(mapStateToProps)
export default class Input extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkData !== this.state.error) {
      this.setState({ error: nextProps.checkData });
      nextProps.checkData === 'success' ? this.props.handleNextStep() : ({});
    }
  }
    
  state = {
    inputData: null,
    error: null
  }

  onChange = (e) => {
    this.setState({
      inputData: e.currentTarget.value
    });
  }

  handleClick = () => {
    this.props.dispatch(actionCheck(this.state.inputData));
    this.props.handleInput(this.state.inputData);
  }

  render() {
    return (
      <div className="main">
        <Paper className="box-selectors box-selectors-center" zDepth={2}>
          <div className="wrapper">
            <TextField
              className="input"
              errorText={this.state.error === 'success' ? '' : this.state.error}
              floatingLabelText="Type it..."
              onChange={e => this.onChange(e)}
            />
            <RaisedButton
              className="check-button"
              label="Check It!" 
              secondary={true}
              onClick={this.handleClick}
            />
          </div>
        </Paper>
      </div>
    )
  }
}
