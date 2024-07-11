import { Avatar } from "@/registry/ui/avatar";

const src =
	"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80";

export default function AvatarDemo() {
	return <Avatar src={src} />;
}
