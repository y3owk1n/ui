import { Button } from "@/registry/ui/button";
import {
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerTitle,
	DrawerTrigger,
} from "@/registry/ui/drawer";
import * as React from "react";

export default function DrawerLongContentDemo() {
	return (
		<DrawerTrigger>
			<Button variant="outline">Long Content Drawer</Button>
			<DrawerOverlay>
				<DrawerContent>
					<div className="mx-auto max-w-[425px]">
						<DrawerHeader>
							<DrawerTitle>Long Content</DrawerTitle>
							<DrawerDescription>
								Content will be scrollable.
							</DrawerDescription>
						</DrawerHeader>

						<Content />

						<DrawerFooter>
							<Button type="submit">Save changes</Button>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</DrawerOverlay>
		</DrawerTrigger>
	);
}

function Content() {
	return (
		<div className="grid gap-4 py-4">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Laoreet sit amet cursus sit amet dictum sit amet justo. Facilisi
				nullam vehicula ipsum a arcu. Elit duis tristique sollicitudin
				nibh sit. Arcu cursus vitae congue mauris rhoncus aenean.
				Vestibulum lectus mauris ultrices eros in cursus turpis massa
				tincidunt. Est ante in nibh mauris cursus mattis molestie a
				iaculis. Velit sed ullamcorper morbi tincidunt ornare massa
				eget. Tincidunt nunc pulvinar sapien et ligula ullamcorper.
				Pharetra convallis posuere morbi leo urna molestie at elementum.
				Scelerisque mauris pellentesque pulvinar pellentesque habitant
				morbi tristique senectus. Sagittis aliquam malesuada bibendum
				arcu vitae. Adipiscing vitae proin sagittis nisl rhoncus mattis
				rhoncus urna. Magna ac placerat vestibulum lectus. Sagittis
				purus sit amet volutpat consequat mauris. Sem nulla pharetra
				diam sit amet nisl suscipit adipiscing bibendum. Condimentum
				mattis pellentesque id nibh. Aliquam eleifend mi in nulla
				posuere sollicitudin aliquam ultrices. Luctus accumsan tortor
				posuere ac ut consequat semper viverra nam. A pellentesque sit
				amet porttitor eget. Pellentesque eu tincidunt tortor aliquam
				nulla facilisi cras fermentum. Lorem ipsum dolor sit amet
				consectetur adipiscing elit pellentesque. Hendrerit gravida
				rutrum quisque non tellus orci ac. Semper viverra nam libero
				justo laoreet sit. Pellentesque id nibh tortor id aliquet lectus
				proin. Id velit ut tortor pretium viverra suspendisse potenti
				nullam ac. Magna fermentum iaculis eu non. Enim lobortis
				scelerisque fermentum dui. Dignissim sodales ut eu sem integer
				vitae justo eget. Tortor consequat id porta nibh venenatis cras
				sed. Penatibus et magnis dis parturient montes nascetur
				ridiculus. Ut tristique et egestas quis. Amet commodo nulla
				facilisi nullam vehicula ipsum a arcu cursus. Metus aliquam
				eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sed
				risus ultricies tristique nulla aliquet enim tortor. Purus
				gravida quis blandit turpis cursus in hac habitasse. Vitae
				aliquet nec ullamcorper sit amet risus. Odio euismod lacinia at
				quis. Sagittis id consectetur purus ut faucibus. Viverra tellus
				in hac habitasse platea dictumst. Egestas erat imperdiet sed
				euismod nisi porta lorem. Nullam eget felis eget nunc lobortis.
				Aliquam eleifend mi in nulla. Lorem donec massa sapien faucibus
				et molestie ac feugiat sed. Duis at consectetur lorem donec
				massa sapien faucibus et molestie. Sit amet aliquam id diam
				maecenas ultricies. Cursus mattis molestie a iaculis at erat
				pellentesque. Sed arcu non odio euismod lacinia. Auctor elit sed
				vulputate mi sit amet. Nunc faucibus a pellentesque sit amet
				porttitor eget dolor. Tempor orci dapibus ultrices in. Turpis
				massa tincidunt dui ut ornare lectus sit.
			</p>
		</div>
	);
}
