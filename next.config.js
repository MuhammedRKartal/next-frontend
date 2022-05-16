/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
	basePath: "",
	// reactStrictMode: true,
	env: {
		REACT_APP_HTTP_URI: process.env.REACT_APP_HTTP_URI,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		GITHUB_ID: process.env.GITHUB_ID,
		GITHUB_SECRET: process.env.GITHUB_SECRET,
		TWITTER_ID: process.env.TWITTER_ID,
		TWITTER_SECRET: process.env.TWITTER_SECRET,
		EMAIL_SERVER: process.env.EMAIL_SERVER,
		EMAIL_FROM: process.env.EMAIL_FROM,
		MONGODB_URI: process.env.MONGODB_URI,
		FEEDREALBVADMIN: process.env.FEEDREALBVADMIN,
	},
	images: {
		domains: [
			"i.gifer.com",
			"parabuckk.s3.eu-central-1.amazonaws.com",
			"hirobucket1.s3.eu-central-1.amazonaws.com",
		],
	},
};

module.exports = nextConfig;
