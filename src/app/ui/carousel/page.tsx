import { Card } from "@/components/ui/card";
import CarouselBottomThumb from "./carousel-bottom-thumb";
import CarouselLeftThumb from "./carousel-left-thumb";
import CarouselNoThumb from "./carousel-no-thumb";

const images = [
	"https://tg-prod-public.oss-ap-southeast-1.aliyuncs.com/tg/media/type/IMAGE/07f7f4d82dc945ce92240472cdd3ddb8",
	"https://tg-prod-public.oss-ap-southeast-1.aliyuncs.com/tg/media/type/IMAGE/4ce9229145134cc38a25ea8e7bf40161",
	"https://tg-prod-public.oss-ap-southeast-1.aliyuncs.com/tg/media/type/IMAGE/ff9aadf195ac438db9ee1eb3d21bb6a1",
	"https://tg-prod-public.oss-ap-southeast-1.aliyuncs.com/tg/media/type/IMAGE/7f259236d32348abbc28278b92f2ec9d",
	"https://tg-prod-public.oss-ap-southeast-1.aliyuncs.com/tg/media/type/IMAGE/312b697d41f140bbb707018e3beec541",
	"https://tg-prod-public.oss-ap-southeast-1.aliyuncs.com/tg/media/type/IMAGE/c226c0e1ca074ef8a6da235a78f7f273",
	"https://tg-prod-public.oss-ap-southeast-1.aliyuncs.com/tg/media/type/IMAGE/2604529fb68b4637a5980f15439d98ef",
];

export default function CarouselPage() {
	return (
		<div className="flex flex-wrap gap-8">
			<Card className="h-fit p-4">
				<CarouselLeftThumb images={images} />
			</Card>
			<Card className="h-fit p-4">
				<CarouselBottomThumb images={images} />
			</Card>
			<Card className="h-fit p-4">
				<CarouselNoThumb images={images} />
			</Card>
		</div>
	);
}
