const baseVariant = {
	default:
		"bg-primary text-primary-foreground data-[hovered]:bg-primary/90 data-[pressed]:bg-primary/70",
	destructive:
		"bg-destructive text-destructive-foreground data-[hovered]:bg-destructive/90 data-[pressed]:bg-destructive/70",
	outline:
		"border border-input bg-background data-[hovered]:bg-accent data-[pressed]:bg-accent/70 data-[hovered]:text-accent-foreground",
	secondary:
		"bg-secondary text-secondary-foreground data-[hovered]:bg-secondary/80 data-[pressed]:bg-secondary/70",
	ghost: "data-[hovered]:bg-accent data-[pressed]:bg-accent/70 data-[hovered]:text-accent-foreground",
};

const linkVariant = {
	link: "text-primary underline-offset-4 data-[hovered]:underline",
};

const unstyledVariant = {
	unstyled: "text-primary data-[hovered]:text-primary/50",
};

export { baseVariant, linkVariant, unstyledVariant };
