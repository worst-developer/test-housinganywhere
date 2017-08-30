import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const select = 'select';

const mapStateToProps = (state) => state.submit

@connect(mapStateToProps)
export default class Toggles extends Component {
  
  constructor(props) {
    super(props);
  }

  state = { 
    selectorValue: null,
    message: '',
    open: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitForm !== this.state.message) {
      this.setState({ 
        message: nextProps.submitForm,
        open: true
      });
    }
  }

  handleChange = (event, index, selectorValue) => {
    this.setState({ selectorValue }, () => this.props.handleSelect(select, this.state.selectorValue));
  }

  render() {
    return (
      <div className="main">
        <Paper 
          className="box-selectors box-selectors-center"
          zDepth={2}>
          <div className="wrapper">
             <SelectField
                floatingLabelText="Select It!"
                value={this.state.selectorValue}
                onChange={this.handleChange} >
              <MenuItem value={'C1'} primaryText="C1" />
              <MenuItem value={'C2'} primaryText="C2" />
              <MenuItem value={'C3'} primaryText="C3" />
             </SelectField>
             <RaisedButton
              className="check-button"
              style={this.state.selectorValue === null ? { display: 'none' } : ({}) }
              label="Submit It!" 
              primary={true}
              onClick={this.props.handlePost}
           />
           <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={1500}
           />   
          </div>
        </Paper>
      </div>
    )
  }
}
