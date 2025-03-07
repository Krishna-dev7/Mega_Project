import star from "@/../public/star.svg";
import Image from "next/image";

function Loading() {
	return (
		<div className="flex flex-col  items-center gap-4">
			<div className="relative h-16 w-16">
				<div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
				<div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-500"></div>
				<div className="absolute inset-0 animate-ping rounded-full border-4 border-teal-500 opacity-20"></div>
			</div>
		</div>
	);
}

export default Loading;
