import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {UserData} from '../../types/user';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextField} from '../../components/TextField';
// @ts-ignore
import MaskedInput from 'react-text-mask';

const CPF_REGEX = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
const PHONE_REGEX = /\+\d{2} \(\d{2}\) \d{4,5}-\d{4}/;

const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

const formSchema: yup.SchemaOf<UserData> = yup.object({
	name: yup.string().required('Preencha o campo'),
	email: yup.string().required('Preencha o campo').email('E-mail inválido'),
	cpf: yup.string().required('Preencha o campo').matches(CPF_REGEX, 'CPF inválido'),
	phone: yup.string().required('Preencha o campo').matches(PHONE_REGEX, 'Telefone inválido'),
});

export const AddUser = () => {
	const onSubmit = (values: UserData) => {
		console.table(values);
	};

	const {register, control, handleSubmit, formState} = useForm<UserData>({
		defaultValues: {
			name: '',
			email: '',
			cpf: '',
			phone: '',
		},
		resolver: yupResolver(formSchema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField
				{...register('name')}
				type={'text'}
				label={'Nome completo (sem abreviações)'}
				error={formState.errors.name}
			/>
			<TextField
				{...register('email')}
				type={'email'}
				label={'E-mail'}
				error={formState.errors.email}
			/>
			<TextField
				{...register('cpf')}
				type={'text'}
				label={'CPF'}
				error={formState.errors.cpf}
				mask={"999.999.999-99"}
			/>
			<TextField
				{...register('phone')}
				type={'text'}
				label={'Telefone'}
				mask={"+99 (99) 99999-9999"}
				error={formState.errors.phone}
			/>
			<button type={'submit'}>Cadastrar</button>
		</form>
	);
};