import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton, styled } from "@mui/material";
import jsCookie from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/slices/userSlice";
import styles from "../../styles/sitenav.module.scss";
import LoginModal from "../LoginModal";

const Sitenav = ({ background, openSideNav, setOpenSideNav }) => {
	const [onPageStart, setOnPageStart] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	// const dispatch = useDispatch()
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	let userName;
	if (state.user.user) {
		userName = state.user.user.name;
	}

	const handleSignOut = () => {
		jsCookie.remove("sessionToken", { path: "/" });
		jsCookie.remove("sessionExpiryDate", { path: "/" });
		dispatch(signOut());
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.ontouchmove = function () {
				let totalHeight = document.body.scrollHeight - window.innerHeight;

				let cur = Number(totalHeight) - Number(window.scrollY);
				if (cur === totalHeight) {
					setOnPageStart(true);
				} else {
					setOnPageStart(false);
				}
			};
			window.onscroll = function () {
				let totalHeight = document.body.scrollHeight - window.innerHeight;

				let cur = Number(totalHeight) - Number(window.scrollY);
				if (cur === totalHeight) {
					setOnPageStart(true);
				} else {
					setOnPageStart(false);
				}
			};
		}
	});

	return (
		<React.Fragment>
			<div className={styles.sitenav}>
				<div
					className={
						!background
							? `${styles.sitenavFull} ${styles.sitenavThin}`
							: onPageStart
							? `${styles.sitenavFull}`
							: `${styles.sitenavFull} ${styles.sitenavThin}`
					}
				>
					<div className={styles.sitenavArea}>
						<div className={styles.sitenavBar}>
							{background && onPageStart && (
								<Link href="/" passHref>
									<Keyframes
										userimage={`url(https://i1.sndcdn.com/avatars-000437272326-k4zsnq-t240x240.jpg)`}
										sx={{ width: "60px" }}
									/>
								</Link>
							)}
							<Link href="/" passHref>
								<Button className={styles.sitenavButton}>Home</Button>
							</Link>

							<Link href="/deneme" passHref>
								<Button className={styles.sitenavButton}>Protected Content</Button>
							</Link>

							{!userName ? (
								<Link href="auth/signin">
									<Button
										onClick={() => {
											// setIsDialogOpen(true);
										}}
										className={`${styles.sitenavSubscribe} ${styles.sitenavButton} ${styles.sitenavButtonRight}`}
									>
										Sign-in
									</Button>
								</Link>
							) : (
								<Button
									onClick={() => {
										handleSignOut();
									}}
									className={`${styles.sitenavSubscribe} ${styles.sitenavButton} ${styles.sitenavButtonRight}`}
								>
									Sign-out
								</Button>
							)}
							{userName && (
								<Button className={`${styles.sitenavButton} ${styles.sitenavButtonRight}`}>
									{userName.split(" ")[0]}
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.sitenavMobile}>
				<div className={styles.sitenavThin}>
					<div className={styles.sitenavArea}>
						<div className={styles.sitenavBar}>
							<IconButton
								onClick={() => {
									setOpenSideNav(!openSideNav);
								}}
							>
								<MenuIcon className={styles.sitenavMobileMenuIcon} />
							</IconButton>
							<Link href="/" passHref>
								<img
									src="https://i1.sndcdn.com/avatars-000437272326-k4zsnq-t240x240.jpg"
									className={styles.sitenavMobileHomeIcon}
								></img>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<LoginModal
				open={isDialogOpen}
				onClose={() => {
					setIsDialogOpen(false);
				}}
			/>
		</React.Fragment>
	);
};

const coinImage = "url(https://cdn-real.s3.amazonaws.com/coin-icon-7.png)";
const Keyframes = styled("div")(({ userimage }) => ({
	"@keyframes pulsate": {
		"0%": {
			transform: "rotateY(180deg)",
			backgroundImage: coinImage,
			boxShadow: "inset -11px 8px 20px -2px rgb(0 0 0 / 75%)",
		},
		"7%": {
			transform: "rotateY(180deg) ",
			backgroundImage: coinImage,
			boxShadow: "inset -16px 13px 18px -2px rgb(0 0 0 / 75%)",
		},
		"25%": {
			transform: "rotateY(180deg) ",
			backgroundImage: coinImage,
			boxShadow: "inset 16px -13px 18px -2px rgb(0 0 0 / 75%)",
		},
		"32%": {
			transform: "rotateY(0deg)",
			backgroundImage: userimage,
			boxShadow: "inset -16px -13px 18px -2px rgb(0 0 0 / 75%)",
		},
		"57%": {
			backgroundImage: userimage,
			boxShadow: "inset -16px -13px 18px -2px rgb(0 0 0 / 75%)",
		},
		"92%": {
			transform: "rotateY(0deg) ",
			backgroundImage: userimage,
		},

		"100%": {
			boxShadow: "inset -16px 13px 18px -2px rgb(0 0 0 / 75%)",
			backgroundImage: coinImage,
			transform: "rotateY(180deg)",
		},
	},
	animation: "pulsate 10s infinite ease",
	borderRadius: "50%",
	backgroundSize: "cover",
	height: "100%",
	float: "left",
}));

export default Sitenav;
