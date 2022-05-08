export default {
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testEnvironment: 'jsdom',
	collectCoverage: true,
	coverageReporters: ["json", "html"],
}