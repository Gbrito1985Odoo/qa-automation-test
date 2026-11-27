export interface TestUser {
  readonly username: string;
  readonly password: string;
}

export const users: Record<'standard' | 'locked' | 'invalid', TestUser> = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'wrong_user', password: 'wrong_pass' },
};

export const checkoutData = {
  firstName: 'QA',
  lastName: 'Automation',
  postalCode: '28001',
};
