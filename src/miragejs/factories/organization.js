import { randomNumber } from './utils';

/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */
import { Factory } from 'miragejs';

/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */
import faker from 'faker';

export default {
  organization: Factory.extend({
    title() {
      return faker.fake('{{company.companyName}}');
    },
    mobile() {
      return faker.fake('{{phone.phoneNumber}}');
    },
  }),
};
