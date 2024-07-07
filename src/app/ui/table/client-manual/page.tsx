import Preview from "@/components/preview";
import { Suspense } from "react";
import DataTable from "./data-table";

export default function TableClientManualPage() {
	return (
		<Preview>
			<div className="w-full max-w-2xl">
				<Suspense fallback={<span>loading...</span>}>
					<DataTable />
				</Suspense>
			</div>
		</Preview>
	);
}
