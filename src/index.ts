#!/usr/bin/env node
import { programFactory } from './cli';

const program = programFactory();
program.parse();
