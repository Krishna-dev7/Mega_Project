"use client"
const Loading:React.FC = () => {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="relative h-14 w-14">
				<div className="absolute inset-0 
					rounded-full border-3 border-gray-800"></div>
				<div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-orange-500"></div>
				<div className="absolute inset-0 animate-ping rounded-full border-4 border-orange-500 opacity-20"></div>
			</div>
		</div>
	);
}

export default Loading;
