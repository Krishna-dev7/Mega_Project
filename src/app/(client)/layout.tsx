import Header from "@/components/customUi/headersUi/Header";
import Footer from "@/components/customUi/layouts/Footer";

const ClientLayout = ({children}
  : {children: React.ReactNode}
) => <>
  <Header />
  {children}
  <Footer />
</>


export default ClientLayout;