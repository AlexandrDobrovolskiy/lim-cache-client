import React, { Component } from 'react';
import StorageDemo from './StorageDemo';

import { createStorage, withLocalStorage } from "lim-cache";
import { CssBaseline, Paper } from '@material-ui/core';

const config = {
  limit: 10000
}

const lsConfig = {
  name: "myStorage",
  blacklist: ["DoNotPersist"]
}

const cache = createStorage(config);
const cacheWithLocalStorage = createStorage(config, withLocalStorage(lsConfig))

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Paper className="demo-container" elevation={2} maxLimit={100 * 1024 * 1024}>
          <StorageDemo storage={cache} title="RAM cache"/>
        </Paper>
        <Paper className="demo-container" elevation={2}>
          <StorageDemo storage={cacheWithLocalStorage} title="RAM cache with localStorage"/>
        </Paper>
      </div>
    );
  }
}

export default App;
