import { Suspense } from "react";
import DataTable from "./data-table";

export default function TableClientHookPage() {
	return (
		<Suspense fallback={<span>loading...</span>}>
			<DataTable />
		</Suspense>
	);
}
