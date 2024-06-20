"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationText,
} from "@/components/ui/pagination";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckboxPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const currentPage = params.get("page");

	const isDesktop = useMediaQuery("(min-width: 768px)");

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
						{isDesktop ? (
							pagination.range.map((page, index) => (
								<PaginationItem key={index}>
									{page === "dots" ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											isActive={
												pagination.active === page
											}
											onPress={() => {
												pagination.setPage(page);
											}}
										>
											{page}
										</PaginationLink>
									)}
								</PaginationItem>
							))
						) : (
							<PaginationItem>
								<PaginationText>
									Page {pagination.active}
								</PaginationText>
							</PaginationItem>
						)}
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
