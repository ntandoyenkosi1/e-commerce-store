import LoadingImg from "../assets/loading.gif";
const Loading = () => {
	return (
		<div>
			<img src={LoadingImg} className='loader' />
			<p>Loading...</p>
		</div>
	);
};
export default Loading;
