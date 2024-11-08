import { expect } from 'chai';

export function assertErrorResponse(response: any, statusCode: number, message: string) {
  expect(response.status).to.equal(statusCode);
  expect(response.body).to.have.property('error');
  expect(response.body.error).to.have.property('message', message);
}
