import { type Registry } from "@/registry/schema";

export const examples: Registry = [
	{
		name: "accordion-demo",
		type: "components:example",
		registryDependencies: ["accordion"],
		files: ["example/accordion-demo.tsx"],
	},
	{
		name: "alert-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-demo.tsx"],
	},
	{
		name: "alert-no-icon-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-no-icon-demo.tsx"],
	},
	{
		name: "alert-error-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-error-demo.tsx"],
	},
	{
		name: "alert-info-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-info-demo.tsx"],
	},
	{
		name: "alert-success-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-success-demo.tsx"],
	},
	{
		name: "alert-warning-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-warning-demo.tsx"],
	},
	{
		name: "avatar-demo",
		type: "components:example",
		registryDependencies: ["avatar"],
		files: ["example/avatar-demo.tsx"],
	},
	{
		name: "avatar-fallback-demo",
		type: "components:example",
		registryDependencies: ["avatar"],
		files: ["example/avatar-fallback-demo.tsx"],
	},
	{
		name: "avatar-size-demo",
		type: "components:example",
		registryDependencies: ["avatar"],
		files: ["example/avatar-size-demo.tsx"],
	},
];
