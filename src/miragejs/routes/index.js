import { Response } from 'miragejs';
import { generateAuthCookie, removeAuthCookie, verifyAuthCookie } from './utils';

/*
 * Mirage JS guide on Routes: https://miragejs.com/docs/route-handlers/functions
 */
export default function routes() {
  this.namespace = 'api';

  /*
   * A resource comprises all operations for a CRUD
   * operation. .get(), .post(), .put() and delete().
   * Mirage JS guide on Resource: https://miragejs.com/docs/route-handlers/shorthands#resource-helper
   */
  this.resource('users');
  this.resource('organizations');
  this.resource('products');

  /*
   * From your component use fetch('api/messages?userId=<a user id>')
   * replacing <a user id> with a real ID
   */
  this.get('messages', (schema, request) => {
    const {
      queryParams: { userId },
    } = request;

    return schema.messages.where({ userId });
  });

  this.post('login', (schema, request) => {
    generateAuthCookie();
    return new Response(200, {}, {});
  });
  this.delete('logout', (schema, request) => {
    removeAuthCookie();
    return new Response(200, {}, {});
  });
  this.get('auth-verify', (schema, request) => {
    const token = request.requestHeaders.token || null;
    if (verifyAuthCookie(token)) {
      return new Response(200, {}, {});
    }
    return new Response(401, {}, {});
  });
}
