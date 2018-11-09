import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactJson from "react-json-view";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { styles } from "./styles";

const initialState = {
  putData: '',
  putKey: "",
  removeKey: "",
};

const IsJsonString = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

class StorageDemo extends Component {
  static propTypes = {
    storage: PropTypes.object.isRequired,
    title: PropTypes.string
  };

  static defaultProps = {
    title: "RAM cache"
  };

  state = {
    ...initialState,
    limit: this.props.storage.limit
  };

  handleLimitChange = e => {
    const { storage } = this.props;
    const { value } = e.target;
    storage.setLimit(value);
  };

  updateStateByName = name => e => {
    const { value } = e.target;
    this.setState({ [name]: value });
  };

  handlePutData = () => {
    const { storage } = this.props;
    const { putKey, putData } = this.state;
    this.setState({putKey: "", putData: ""});
    storage.set(putKey, JSON.parse(putData));
  };

  handleRemoveData = () => {
    const { storage } = this.props;
    const { removeKey } = this.state;
    this.setState({removeKey: ""});
    storage.remove(removeKey);
  };

  handleClearStorage = () => {
    const { storage } = this.props;
    this.setState({...initialState})
    storage.clear();
  };

  render() {
    const { title, storage, classes } = this.props;
    const { putData, putKey, removeKey } = this.state;

    return (
      <Grid
        container
        justify="center"
        direction="column"
        className={classes.root}
      >
        <Typography component="h2" variant="h2" gutterBottom>
          {title}
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom>
          Size
        </Typography>
        <Grid item className={classes.gridItem}>
          <TextField
            label="Limit (Bytes)"
            className={classes.textField}
            onChange={this.handleLimitChange}
            variant="outlined"
            type="number"
            defaultValue={storage.limit}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </Grid>
        <Typography component="h2" variant="h4" gutterBottom>
          Put Data
        </Typography>
        <Grid item className={classes.gridItem}>
          <TextField
            label="Key"
            className={classes.textField}
            variant="outlined"
            type="text"
            value={putKey}
            onChange={this.updateStateByName("putKey")}
          />
          <TextField
            label="Value (in JSON format)"
            multiline
            className={classes.textField}
            variant="outlined"
            value={putData}
            onChange={this.updateStateByName("putData")}
          />
          <Button
            variant="contained"
            onClick={this.handlePutData}
            className={classes.button}
            disabled={!IsJsonString(putData) || !putKey}
            color="primary"
          >
            PUT
          </Button>
        </Grid>
        <Typography component="h2" variant="h4" gutterBottom>
          Remove Data
        </Typography>
        <Grid item className={classes.gridItem}>
          <TextField
            label="Key"
            variant="outlined"
            type="text"
            value={removeKey}
            className={classes.textField}
            onChange={this.updateStateByName("removeKey")}
          />
          <Button
            variant="contained"
            onClick={this.handleRemoveData}
            className={classes.button}
            color="secondary"
          >
            Remove
          </Button>
        </Grid>
        <Typography component="h2" variant="h4" gutterBottom>
          Stored Data
        </Typography>
        <div className="data-preview">
          <ReactJson
            theme="monokai"
            iconStyle="triangle"
            src={storage.getAll()}
            style={{ borderRadius: "10px", padding: "10px" }}
          />
        </div>
        <Button
          variant="contained"
          onClick={this.handleClearStorage}
          className={classes.button}
        >
          Clear
        </Button>
      </Grid>
    );
  }
}

export default withStyles(styles)(StorageDemo);
