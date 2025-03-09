'use client'
import SideBar from "@/components/admin/SideBar";

const AdminLayout = (
  {children}
  :{children: React.ReactNode}
) => <> 
  <div className="admin-layout min-h-screen flex">
    <div className="sidebar-container">
      <SideBar />
    </div>

    <div className="pages w-full 
      h-screen overflow-hidden">
      {children}
    </div>
  </div>
 </>

export default AdminLayout;