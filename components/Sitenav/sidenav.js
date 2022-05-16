import React, { useEffect, useRef } from "react";
import styles from "../../styles/sidenav.module.scss";

const Sidenav = ({ openSideNav, setOpenSideNav }) => {
    let sideNavRef = useRef()
    useEffect(() => {
        let handler = (event) => {
            if (openSideNav & !sideNavRef.current.contains(event.target)) {
                setOpenSideNav(false)
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div ref={sideNavRef} className={styles.sidenav}>

            <div className={openSideNav? styles.sidenavContainer : styles.sidenavContainerClosed}>
                asadvasd
            </div>

        </div>
    )
}

export default Sidenav