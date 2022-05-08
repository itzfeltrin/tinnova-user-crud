import {render, screen} from '@testing-library/react';
import { FieldError } from 'react-hook-form';
import {TextField} from './index';

jest.mock("react-input-mask", () => ({
    default: jest.fn()
}))

describe('TextField component', () => {
	it('Renders regular input when no mask is provided', async () => {
		render(<TextField label={'Test'}/>);

		const textField = await screen.findByTestId('text-field');

		expect(textField).toBeTruthy();
	});

    it('Renders masked input when a mask is provided', async () => {
		render(<TextField label={'Test'} mask={'999.999.999-99'}/>);

		const textField = await screen.findByTestId('text-field');

		expect(textField).toBeTruthy();
	});

    it('Renders error message', async () => {
        const mockError: FieldError = {
            type: "required",
            message: "Preencha o campo",
        };

        render(<TextField label={'Test'} error={mockError} />);

        const errorMessage = await screen.findByText("Preencha o campo");

        expect(errorMessage).toBeTruthy();
    });
});