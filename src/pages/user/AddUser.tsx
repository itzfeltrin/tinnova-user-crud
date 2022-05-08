import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {UserData} from '../../types/user';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextField} from '../../components/TextField';
import {Spinner} from '../../components/Spinner';
import {useCallback, useEffect, useMemo} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useUserContext} from '../../context/User.context';
import {formatCpf, formatPhone} from '../../helpers';

const CPF_REGEX = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
const PHONE_REGEX = /\+\d{2} \(\d{2}\) \d{4,5}-\d{4}/;

const formSchema: yup.SchemaOf<UserData> = yup.object({
	name: yup.string().required('Preencha o campo'),
	email: yup.string().required('Preencha o campo').email('E-mail inválido'),
	cpf: yup.string().required('Preencha o campo').matches(CPF_REGEX, 'CPF inválido'),
	phone: yup.string().required('Preencha o campo').matches(PHONE_REGEX, 'Telefone inválido'),
});

function useQuery() {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}

export const AddUser = () => {
	const {upsertUser} = useUserContext();

	const query = useQuery();
	const navigate = useNavigate();

	const onSubmit = useCallback(async (values: UserData) => {
		const res: UserData = await new Promise((resolve) => {
			setTimeout(() => {
				resolve(values);
			}, 2000);
		});

		const oldUser = query.get("user");
		if (oldUser) {
			upsertUser(res, JSON.parse(oldUser).email);
		} else {
			upsertUser(res);
		}

		navigate('/users/list', {
			replace: true
		});
	}, [upsertUser, navigate]);

	const {register, handleSubmit, formState, setValue} = useForm<UserData>({
		defaultValues: {
			name: '',
			email: '',
			cpf: '',
			phone: '',
		},
		resolver: yupResolver(formSchema),
	});

	useEffect(() => {
		const user = query.get('user');
		if (!user) return;
		const parsed = JSON.parse(user);
		setValue('name', parsed.name);
		setValue('email', parsed.email);
		setValue('cpf', formatCpf(parsed.cpf));
		setValue('phone', formatPhone(parsed.phone));
	}, [query]);

	return (
		<main className={'page'}>
			<h1>Adicionar novo usuário</h1>
			<Link to={'/users/list'}>Listagem de usuários</Link>
			<form onSubmit={handleSubmit(onSubmit)} className={'user-form'}>
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
					mask={'999.999.999-99'}
				/>
				<TextField
					{...register('phone')}
					type={'text'}
					label={'Telefone'}
					mask={'+99 (99) 99999-9999'}
					error={formState.errors.phone}
				/>
				<button type={'submit'} disabled={formState.isSubmitting}>{
					formState.isSubmitting ? <Spinner size={20}/> : 'Cadastrar'}</button>
			</form>
		</main>
	);
};