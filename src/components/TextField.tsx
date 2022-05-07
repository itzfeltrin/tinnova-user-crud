import {ChangeEventHandler, forwardRef, InputHTMLAttributes, useCallback, useState} from 'react';
import {FieldError} from 'react-hook-form';
import {getClassName} from '../helpers';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error: FieldError | undefined;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({error, ...props}, ref) => {
	const [empty, setEmpty] = useState(true);

	const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
		if (props.onChange) {
			props.onChange(event);
		}
		const value = event.target.value;
		setEmpty(value === '');
	}, [props.onChange]);

	return (
		<div className="text-field">
			<div className="relative-box">
				<input
					ref={ref}
					id={props.name}
					className={getClassName({
						invalid: !!error,
						empty
					})}
					{...props}
					onChange={onChange}
				/>
				<label htmlFor={props.name}>{props.label}</label>
			</div>
			{error && <span className={'error-message'}>{error.message}</span>}
		</div>
	);
});
