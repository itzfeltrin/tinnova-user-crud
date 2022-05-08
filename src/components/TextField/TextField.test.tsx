import {fireEvent, render, screen} from '@testing-library/react';
import { FieldError } from 'react-hook-form';
import {TextField} from './index';

jest.mock("react-input-mask", () => ({
    default: jest.fn()
}))

const setEmptyMock = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: () => [false, setEmptyMock],
}));

describe('TextField component', () => {
    beforeEach(() => {
        setEmptyMock.mockClear();
    });

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

    it('Handles on change properly when not empty', async () => {
        const onChangeMock = jest.fn();

        render(<TextField label={'Test'} onChange={onChangeMock} />);

        const textField = (await screen.findByTestId('text-field')) as HTMLInputElement;

        const input = textField.children[0].children[0];

		expect(input).toBeTruthy();

        fireEvent.change(input, {
            target: {
                value: 'test'
            }
        });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(setEmptyMock).toHaveBeenCalledWith(false);
    });

    it('Handles on change properly when not empty', async () => {
        const onChangeMock = jest.fn();

        render(<TextField label={'Test'} onChange={onChangeMock} />);

        const textField = (await screen.findByTestId('text-field')) as HTMLInputElement;

        const input = textField.children[0].children[0];

		expect(input).toBeTruthy();

        fireEvent.change(input, {
            target: {
                value: 'test'
            }
        });

        fireEvent.change(input, {
            target: {
                value: ''
            }
        });

        expect(onChangeMock).toHaveBeenCalledTimes(2);
        expect(setEmptyMock).toHaveBeenCalledWith(true);
    });
});