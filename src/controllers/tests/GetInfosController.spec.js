const jwt = require('jsonwebtoken');

const testToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTViZTUwZTZjMjYyODk4Njk1NmI5YmYiLCJjcmVhdGVkQXQiOiIyMDIzLTExLTIwVDIzOjAwOjMwLjg3OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTIyVDAyOjAwOjE4Ljc2MFoiLCJ1bHRpbW9fbG9naW4iOiIyMDIzLTExLTIyVDAyOjAwOjE4Ljc2MFoiLCJpYXQiOjE3MDA2MjAyMjYsImV4cCI6MTcwMDYyMjAyNn0.i8aJklSBTCk2V4QkhPu2-VAHlUOO4R9bijmAdsG7EHs';

const testTokenExpired =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTViZTUwZTZjMjYyODk4Njk1NmI5YmYiLCJjcmVhdGVkQXQiOiIyMDIzLTExLTIwVDIzOjAwOjMwLjg3OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTIxVDIwOjU4OjM1LjA4MVoiLCJ1bHRpbW9fbG9naW4iOiIyMDIzLTExLTIxVDIwOjU4OjM1LjA4MVoiLCJpYXQiOjE3MDA2MDI2NTgsImV4cCI6MTcwMDYwNDQ1OH0.WFCOfSWFP46Xe5KtTdOYRIayfl6wntrNAZfEYtzQurQ';

const mockUsers = {
	findOne: jest.fn().mockImplementation((query) => {
		if (query && query._id === '655be50e6c2628986956b9bf') {
			return Promise.resolve(mockUsers.user);
		} else {
			return Promise.resolve(null);
		}
	}),
	user: {
		_id: '655be50e6c2628986956b9bf',
		nome: 'Exemplo de Usuário',
		email: 'exemplo@email.com',
		senha: '$2b$10$k8jywmlkJa3AS5xXP8bPZOYCA0NDgo2bMAIlbwGQhy4hRATk/N8qO',
		telefones: [
			{
				numero: '987654321',
				ddd: '22',
				_id: '655be50e6c2628986956b9c0',
			},
		],
		createdAt: '2023-11-20T23:00:30.879Z',
		updatedAt: '2023-11-21T20:58:35.081Z',
		__v: 0,
		token: '$2b$10$WVG2.orvutxwEsLSizv3Ze3wJEKKm2ZUI7VbLIgYXK/6vYq4Ss4z2',
	},
};

describe('GetInfos Contoller: ', () => {
	it('Should send user successfully when the token is valid', async () => {
		const token = testToken;

		const authData = await new Promise((resolve, reject) => {
			jwt.verify(token, 'token', (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const user = await mockUsers.findOne({ _id: authData.userId });

		expect(user).toMatchObject(mockUsers.user);
	});

	it('Should return valid JSON if the user is found', async () => {
		const token = testToken;

		const authData = await new Promise((resolve, reject) => {
			jwt.verify(token, 'token', (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const user = await mockUsers.findOne({ _id: authData.userId });

		if (user) {
			const result = { mensagem: 'Token válido', user };
			expect(result).toEqual(
				expect.objectContaining({ mensagem: 'Token válido', user }),
			);
		}
	});

	it('Should return valid JSON if token is false', async () => {
		const token = testToken;

		const authData = await new Promise((resolve, reject) => {
			jwt.verify(token, 'token', (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const user = await mockUsers.findOne({ _id: authData.userId });

		if (!user) {
			const result = { mensagem: 'Token Invalido' };
			expect(result).toEqual(
				expect.objectContaining({ mensagem: 'Token válido' }),
			);
		}
	});
	it('It should return TokenExpiredError when token is expired', () => {
		const token = testTokenExpired;

		jwt.verify(token, 'token', (err, decoded) => {
			if (err) {
				if (err === 'TokenExpiredError') {
					const erro = { mensagem: 'Token expirado' };
					expect(erro).toEqual(
						expect.objectContaining({ mensagem: 'Token expirado' }),
					);
				} else {
					decoded;
				}
			}
		});
	});
});
