import {FormEventHandler} from 'react';
import * as yup from 'yup';

const CPF_REGEX = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
const PHONE_REGEX = /\(\d{2}\) \d{4,5}-\d{4}/;

const formSchema = yup.object({
	name: yup.string().required("Preencha o campo"),
	email: yup.string().required("Preencha o campo").email("E-mail inválido"),
	cpf: yup.string().required("Preencha o campo").matches(CPF_REGEX, "CPF inválido"),
	phone: yup.string().required("Preencha o campo").matches(PHONE_REGEX, "Telefone inválido"),
});

export const AddUser = () => {
	const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const elements = Array.from((event.target as HTMLFormElement).elements)
			.filter(element => {
				const input = element as HTMLInputElement;
				return input.name !== '';
			})
			.map((element) => {
				const input = element as HTMLInputElement;
				return {
					name: input.name,
					value: input.value,
				};
			})
			.reduce((acc, element) => ({
				...acc,
				[element.name]: element.value,
			}), {});

		console.log(elements);
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="input-field">
				<input name={'name'} id={'name'} type={'text'}/>
				<label htmlFor={'name'}>Nome completo (sem abreviações)</label>
			</div>
			<div className="input-field">
				<input name={'email'} id={'email'} type={'email'}/>
				<label htmlFor={'email'}>E-mail</label>
			</div>
			<div className="input-field">
				<input name={'cpf'} id={'cpf'} type={'text'}/>
				<label htmlFor={'cpf'}>CPF</label>
			</div>
			<div className="input-field">
				<input name={'phone'} id={'phone'} type={'text'}/>
				<label htmlFor={'phone'}>Telefone</label>
			</div>
			<button type={'submit'}>Cadastrar</button>
		</form>
	);
};