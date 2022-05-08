type SpinnerProps = {
	size: number;
}

export const Spinner = ({size}: SpinnerProps) => {
	return <div className={'spinner'} data-testid={'spinner'} style={{width: size, height: size}}/>;
};