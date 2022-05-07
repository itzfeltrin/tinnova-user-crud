import {ChangeEventHandler, forwardRef, useCallback, useState} from 'react';
import {FieldError} from 'react-hook-form';
import {getClassName} from '../helpers';
import InputMask, {Props as InputMaskProps} from 'react-input-mask';

type TextFieldProps = Omit<InputMaskProps, 'mask'> & {
	label: string;
	error: FieldError | undefined;
	mask?: InputMaskProps['mask'];
};

export const TextField = forwardRef<InputMask, TextFieldProps>(({label, error, mask, ...props}, ref) => {
	const [empty, setEmpty] = useState(true);

	const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
		if (props.onChange) {
			props.onChange(event);
		}
		const value = event.target.value;
		setEmpty(value === '');
	}, [props.onChange]);

	const renderComponent = (props: any) => mask ? <InputMask mask={mask} {...props} /> : <input {...props} />;

	return (
		<div className="text-field">
			<div className="relative-box">
				{renderComponent({
					ref: ref,
					id: props.name,
					className: getClassName({
						invalid: !!error,
						empty
					}),
					...props,
					onChange,
				})}
				<label htmlFor={props.name}>{label}</label>
			</div>
			{error && <span className={'error-message'}>{error.message}</span>}
		</div>
	);
});
