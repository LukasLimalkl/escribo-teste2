const Users = require('../../models/Users');

describe('SignUp Controller: ', () => {
	it('Should create a new user and return user info with status 201', async () => {
		const mockReq = {
			body: {
				nome: 'Test User',
				email: 'test@example.com',
				senha: 'testpassword',
				telefones: [{ numero: '123456789', ddd: '11' }],
			},
		};

		const createdUser = {
			_id: '1234567890',
			...mockReq.body,
			createdAt: new Date(),
			updatedAt: new Date(),
			ultimo_login: new Date(),
			token: 'mockedToken',
		};

		Users.create = jest.fn().mockResolvedValue(createdUser);

		const user = await Users.create(mockReq.body);

		expect(Users.create).toHaveBeenCalledWith(mockReq.body);

		expect(user).toEqual(
			expect.objectContaining({
				_id: expect.any(String),
				nome: 'Test User',
				email: 'test@example.com',
				senha: 'testpassword',
				telefones: [{ numero: '123456789', ddd: '11' }],
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
				ultimo_login: expect.any(Date),
				token: 'mockedToken',
			}),
		);
	});
});
