const baseVariant = {
	default:
		"bg-primary text-primary-foreground data-[hovered]:bg-primary/90 data-[pressed]:bg-primary/70",
	destructive:
		"bg-destructive border border-destructive-foreground/10 text-destructive-foreground data-[hovered]:bg-destructive/90 data-[pressed]:bg-destructive/70",
	success:
		"bg-success border border-success-foreground/10 text-success-foreground data-[hovered]:bg-success/90 data-[pressed]:bg-success/70",
	info: "bg-info border border-info-foreground/10 text-info-foreground data-[hovered]:bg-info/90 data-[pressed]:bg-info/70",
	warning:
		"bg-warning border border-warning-foreground/10 text-warning-foreground data-[hovered]:bg-warning/90 data-[pressed]:bg-warning/70",
	outline:
		"border border-input bg-background data-[hovered]:bg-accent data-[pressed]:bg-accent/70 data-[hovered]:text-accent-foreground",
	secondary:
		"bg-secondary text-secondary-foreground data-[hovered]:bg-secondary/80 data-[pressed]:bg-secondary/70",
	ghost: "bg-background data-[hovered]:bg-accent data-[pressed]:bg-accent/70 data-[hovered]:text-accent-foreground",
};

const linkVariant = {
	link: "text-primary underline-offset-4 data-[hovered]:underline",
};

const unstyledVariant = {
	unstyled: "text-primary data-[hovered]:text-primary/50",
};

export { baseVariant, linkVariant, unstyledVariant };
