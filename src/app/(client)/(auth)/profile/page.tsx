'use client'

import SettingPage from "@/app/(admin)/dashboard/settings/page";

const clientProfilePage:React.FC = () => {
	return (
		<div
			className="profile-page w-full flex
      min-h-screen items-center justify-center">
			<div className="client w-full h-fit 
       bg-black pt-10">
				<SettingPage />
			</div>
		</div>
	);
}

export default clientProfilePage;