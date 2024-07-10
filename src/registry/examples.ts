import { type Registry } from "@/registry/schema";

export const examples: Registry = [
	{
		name: "accordion-demo",
		type: "components:example",
		registryDependencies: ["accordion"],
		files: ["example/accordion-demo.tsx"],
	},
];
