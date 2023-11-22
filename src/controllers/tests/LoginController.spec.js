const bcrypt = require('bcrypt');
const authController = require('../index');
const Users = require('../../models/Users');

jest.mock('../../models/Users', () => ({
	findOne: jest.fn(),
}));

describe('Sign In Controller:', () => {
	it('Should sign in a user and return user info with token without calling save()', async () => {
		const mockReq = {
			body: {
				email: 'exemplo@email.com',
				senha: 'senha123',
			},
		};

		const mockRes = {
			status: jest.fn(() => mockRes),
			json: jest.fn(),
		};

		const existingUser = {
			_id: '655be50e6c2628986956b9bf',
			email: 'exemplo@email.com',
			senha: await bcrypt.hash('senha123', 10),
			createdAt: new Date(),
			updatedAt: new Date(),
			save: jest.fn(),
		};

		Users.findOne.mockResolvedValue(existingUser);

		await authController.signIn(mockReq, mockRes);

		expect(Users.findOne).toHaveBeenCalledWith({ email: mockReq.body.email });
		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			userId: existingUser._id,
			createdAt: existingUser.createdAt,
			updatedAt: existingUser.updatedAt,
			ultimo_login: existingUser.updatedAt,
			token: expect.any(String),
		});
	});
});
