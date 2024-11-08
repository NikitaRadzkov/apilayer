import { expect } from 'chai';
import { ApiClient } from '../src/controllers/api-client';
import { assertErrorResponse } from '../src/utils/test';
import { ENDPOINTS } from '../src/constants/endpoints';
import { describe, it } from 'mocha';


const client = new ApiClient();
const endpoint = `${ENDPOINTS.FIXER}${ENDPOINTS.LATEST}`;

describe('Fixer API Tests', () => {
  it('TC-001: Valid request should return 200 with exchange rates', async () => {
    const response = await client.get(endpoint);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('rates').that.is.an('object');
    expect(response.body).to.have.property('base').that.is.a('string');
    expect(response.body).to.have.property('date').that.is.a('string');
  });

  it('TC-002: Invalid API key should return 401', async () => {
    const response = await client.getWithInvalidApiKey(endpoint);

    assertErrorResponse(response, 401, 'Invalid API Key.');
  });

  it('TC-003: Missing API key should return 403', async () => {
    const response = await client.getWithoutApiKey(endpoint);

    assertErrorResponse(response, 403, 'No API Key provided.');
  });

  it('TC-004: Invalid query parameter should return 400', async () => {
    const response = await client.get(endpoint, { invalid_param: 'USD' });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.have.property('message');
  });

  it('TC-005: Non-existent endpoint should return 404', async () => {
    const response = await client.get(`${ENDPOINTS.FIXER}/invalid_endpoint`);

    assertErrorResponse(response, 404, 'Not Found');
  });

  it('TC-006: Exceeding rate limit should return 429', async () => {
    const requests = Array(10).fill(client.get(endpoint));
    const responses = await Promise.all(requests);

    const rateLimitedResponse = responses.find(res => res.status === 429);
    expect(rateLimitedResponse).to.not.be.undefined;
    assertErrorResponse(rateLimitedResponse!, 429, 'Too Many Requests');
  });
});
