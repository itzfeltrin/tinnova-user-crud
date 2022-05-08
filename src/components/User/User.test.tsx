import {fireEvent, render, screen} from '@testing-library/react';
import {User} from './index';
import {UserData} from '../../types/user';

const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
	useNavigate: () => navigateMock,
}));

const removeUserMock = jest.fn();

jest.mock('../../hooks/useUserContext', () => ({
	useUserContext: () => ({
		removeUser: removeUserMock,
	})
}));

const mock: UserData = {
	name: 'Test',
	email: 'test@test.com',
	cpf: '000.000.000-00',
	phone: '+55 (54) 99999-9999'
};

describe('Spinner component', () => {
	beforeEach(() => {
		render(<User user={mock}/>);
	});

	it('Renders correctly', async () => {
		const user = await screen.findByTestId('user');

		expect(user).toBeTruthy();
	});

	it('Handles edit', async () => {
		const menuButton = await screen.getByTestId('menu');

		expect(menuButton).toBeTruthy();

		fireEvent.click(menuButton);

		const editButton = await screen.getByText('Editar');

		fireEvent.click(editButton);

		expect(navigateMock).toHaveBeenCalledWith(`/users/edit?user=${JSON.stringify(mock)}`);
	});

	it('Handles remove', async () => {
		const menuButton = await screen.getByTestId('menu');

		expect(menuButton).toBeTruthy();

		fireEvent.click(menuButton);

		const removeButton = await screen.getByText('Remover');

		fireEvent.click(removeButton);

		expect(removeUserMock).toHaveBeenCalledWith(mock.email);
	});
});