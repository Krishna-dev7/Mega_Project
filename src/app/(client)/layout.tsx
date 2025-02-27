import Header from "@/components/customUI/headersUi/Header";
import Footer from "@/components/customUI/layouts/Footer";

const ClientLayout = ({children}
  : {children: React.ReactNode}
) => <>
  <Header />
  {children}
  <Footer />
</>


export default ClientLayout;