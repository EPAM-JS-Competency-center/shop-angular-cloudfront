#!/bin/bash

npm lint;
npm test -- --watch false;
npm audit;
