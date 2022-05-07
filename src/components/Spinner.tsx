type SpinnerProps = {
	size: number;
}

export const Spinner = ({size}: SpinnerProps) => {
	return <div className={'spinner'} style={{width: size, height: size}}/>;
};