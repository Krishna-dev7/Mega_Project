"use client";

import SideBar from "@/components/admin/SideBar";

const AdminLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="admin-layout flex h-screen overflow-hidden">
			{/* Sidebar stays full height and doesn’t scroll */}
			<div className="sidebar-container h-full border-r bg-white dark:bg-zinc-900">
				<SideBar />
			</div>

			{/* Content area scrolls if needed */}
			<div className="pages flex-1 h-full  overflow-y-auto p-4">
				{children}
			</div>
		</div>
	);
};

export default AdminLayout;
