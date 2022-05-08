import {render, screen} from '@testing-library/react';
import {Spinner} from './index';

describe('Spinner component', () => {
	it('Renders correctly', async () => {
		render(<Spinner size={20}/>);

		const spinner = await screen.findByTestId('spinner');

		expect(spinner).toBeTruthy();
		expect(spinner.style.width).toBe("20px");
		expect(spinner.style.height).toBe("20px");
	});
});