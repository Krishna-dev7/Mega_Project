import conf from "./conf";

const navItems = [{ 
		slug: "Home", 
		href: `${conf.url}/`
	},
	{ 
		slug: "Shop", 
		href: "/products" 
	},
	{ 
		slug: "Login", 
		href: "/signin" 
	},
	{ 
		slug: "About", 
		href: "/about" 
}];

export default navItems;
