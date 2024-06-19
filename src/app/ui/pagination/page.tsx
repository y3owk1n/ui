"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckboxPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const currentPage = params.get("page");

	return (
		<div className="">
			<Pagination
				total={20}
				boundaries={1}
				initialPage={currentPage}
				onChange={(page) => {
					params.set("page", page.toString());
					router.push(`?${params.toString()}`);
				}}
			>
				{(pagination) => (
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								isDisabled={pagination.isFirstPage}
								onPress={() => {
									pagination.previous();
								}}
							/>
						</PaginationItem>
						{pagination.range.map((page, index) => (
							<PaginationItem key={index}>
								{page === "dots" ? (
									<PaginationEllipsis />
								) : (
									<PaginationLink
										isActive={pagination.active === page}
										onPress={() => {
											pagination.setPage(page);
										}}
									>
										{page}
									</PaginationLink>
								)}
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								isDisabled={pagination.isLastPage}
								onPress={() => {
									pagination.next();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				)}
			</Pagination>
		</div>
	);
}
