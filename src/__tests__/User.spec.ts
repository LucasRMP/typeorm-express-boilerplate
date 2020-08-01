import { User } from '@models/User';

it('should be ok', () => {
  const user = new User();

  user.name = 'Lucas Pessone';
  user.role = 'creator';

  expect(user.name).toEqual('Lucas Pessone');
});
