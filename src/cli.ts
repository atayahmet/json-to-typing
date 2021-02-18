#!/usr/bin/env node
import handler from './cli-handler';

(() => {
  handler(process)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
})();
