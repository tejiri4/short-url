import { createTestClient }from 'apollo-server-testing';
import chai from 'chai';
import server from '../index';

const { query, mutate } = createTestClient(server);
const { expect } = chai;

export { 
  query,
  mutate,
  expect
};