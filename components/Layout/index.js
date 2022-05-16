import React, { useState } from "react";
import Sitenav from "../Sitenav";
import Sidenav from "../Sitenav/sidenav";

const Layout = ({ children, background }) => {
	const [openSideNav, setOpenSideNav] = useState(false);

	return (
		<React.Fragment>
			<div className="Loading">
				<div className={openSideNav ? "Sidenav-overlay" : null}>
					<Sitenav background={background} openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
					<div className={openSideNav ? "Sidenav-overlay-moving" : null}></div>
					{children}
				</div>
				<Sidenav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
			</div>
		</React.Fragment>
	);
};

export default Layout;
