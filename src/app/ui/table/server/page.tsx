import { type CharacterRes } from "./column-defs";
import DataTable from "./data-table";

interface TablePageProps {
	searchParams?: Record<string, string | string[] | undefined>;
}

export default async function TablePage({ searchParams }: TablePageProps) {
	const page = searchParams?.page ? Number(searchParams.page) : 1;
	const searchTerm = (searchParams?.s ?? "") as string;

	const res = await fetch(
		`https://swapi.py4e.com/api/people/?search=${searchTerm}&page=${page}`,
	);
	const json = (await res.json()) as CharacterRes;
	const items = json.results.map((item, index) => ({
		...item,
		id: item.name + "-" + index,
		height: Number(item.height),
		mass: Number(item.mass),
	}));

	const totalPages = json.count;

	return (
		<DataTable
			items={items}
			totalPages={totalPages}
			currentPage={page}
			searchTerm={searchTerm}
		/>
	);
}
